import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
    try {
        const filePath = join(process.cwd(), 'public', 'models', 'gaming-chair.glb');
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer.buffer as ArrayBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'model/gltf-binary',
                'Content-Length': fileBuffer.length.toString(),
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error('Error serving GLB:', error);
        return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
}
