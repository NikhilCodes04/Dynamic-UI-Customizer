import { config } from 'dotenv';
import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: '.env.local' });

async function uploadModel() {
    try {
        const filePath = join(__dirname, '../public/models/gaming-chair.glb');
        const fileBuffer = readFileSync(filePath);

        console.log('Uploading gaming-chair.glb to Vercel Blob...');

        const blob = await put('gaming-chair.glb', fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
            contentType: 'model/gltf-binary',
            addRandomSuffix: false,
            allowOverwrite: true,
        });

        console.log('✅ Upload successful!');
        console.log('📦 Blob URL:', blob.url);
        console.log('\nUpdate your ThreeDViewer.tsx to use this URL:');
        console.log(`const { scene } = useGLTF('${blob.url}');`);

        return blob.url;
    } catch (error) {
        console.error('❌ Upload failed:', error);
        process.exit(1);
    }
}

uploadModel();
