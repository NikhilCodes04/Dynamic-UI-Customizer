'use client';

import React, { Suspense, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useEditorStore } from '@/store/storeEditor';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Model URL constant - using GitHub media URL for LFS files
const MODEL_URL = 'https://media.githubusercontent.com/media/NikhilCodes04/Dynamic-UI-Customizer/main/public/models/gaming-chair.glb';

// Loading indicator component
function LoadingBox() {
    return (
        <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#666" wireframe />
        </mesh>
    );
}

// This component loads the GLB model
function ChairModel() {
    // Using GitHub Releases CDN - reliable and fast
    const gltf = useLoader(GLTFLoader, MODEL_URL);
    const { materials: editorMaterials } = useEditorStore((state) => state);

    const clonedScene = useMemo(() => {
        const cloned = gltf.scene.clone();
        cloned.traverse((child: THREE.Object3D) => {
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
    }, [gltf.scene, editorMaterials.leather.color]);

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
            <Suspense fallback={<LoadingBox />}>
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