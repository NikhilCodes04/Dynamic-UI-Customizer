'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useEditorStore } from '@/store/storeEditor';
import * as THREE from 'three';

// This component loads the GLB model
function ChairModel() {
    const { scene } = useGLTF('https://gvh2efpdvae0r9bf.public.blob.vercel-storage.com/gaming-chair.glb');
    //const { scene } = useGLTF('/models/gaming-chair.glb');
    const { materials: editorMaterials } = useEditorStore((state) => state);

    const clonedScene = useMemo(() => {
        const cloned = scene.clone();
        cloned.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;

                if (!Array.isArray(mesh.material)) {
                    const newMaterial = mesh.material.clone();

                    // Type guard to ensure the material has a 'color' property
                    if ('color' in newMaterial && newMaterial.color instanceof THREE.Color) {
                        newMaterial.color.set(editorMaterials.leather.color as THREE.ColorRepresentation);
                    }

                    mesh.material = newMaterial;
                }
            }
        });
        return cloned;
    }, [scene, editorMaterials.leather.color]);

    return <primitive object={clonedScene} scale={1} position={[-200, 50, 0]} />;
}

export function ThreeDViewer() {
    return (
        <Canvas shadows camera={{ position: [-500, 500, 500], fov: 50, far: 5000 }}>
            <ambientLight intensity={0.7} />
            {/* Use the camelCase intrinsic element for the light */}
            <directionalLight
                position={[0, 10, 5]} // Light comes more from the top
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <Suspense fallback={null}>
                <ChairModel />
                <Environment preset="city" />
            </Suspense>

            {/* --- ADD THIS --- */}
            {/* A transparent plane that receives shadows */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.25} />
            </mesh>
            {/* --- END ADD --- */}

            <OrbitControls />
        </Canvas>
    );
}