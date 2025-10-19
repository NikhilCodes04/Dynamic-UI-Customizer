require('dotenv').config({ path: '.env.local' });
const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function uploadModel() {
  try {
    const filePath = path.join(__dirname, '../public/models/gaming-chair.glb');
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log('Uploading gaming-chair.glb to Vercel Blob...');
    
    const blob = await put('gaming-chair.glb', fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
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
