# Uploading 3D Model to Vercel Blob

## Quick Start

### 1. Get Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **Dynamic-UI-Customizer**
3. Go to **Storage** tab (or create a Blob store)
4. Click **Create Database** → Select **Blob**
5. Copy the `BLOB_READ_WRITE_TOKEN`

### 2. Add Token to `.env.local`

Replace `your_token_here` in `.env.local` with your actual token:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

### 3. Upload the Model

Run the upload script:

```bash
npm run upload-model
```

### 4. Update ThreeDViewer.tsx

After successful upload, copy the Blob URL from the console output and update your `ThreeDViewer.tsx`:

```tsx
// Before:
const { scene } = useGLTF('/models/gaming-chair.glb');

// After:
const { scene } = useGLTF('https://your-blob-url.vercel-storage.com/gaming-chair.glb');
```

### 5. Deploy

Commit and push your changes, then deploy to Vercel!

## Why Vercel Blob?

- ✅ Free tier: 500MB storage, 5GB bandwidth/month
- ✅ Fast CDN delivery
- ✅ Integrated with Vercel
- ✅ No LFS issues
- ✅ Easy to use

## Alternative: GitHub Releases

If you prefer not to use Vercel Blob:

1. Go to: https://github.com/NikhilCodes04/Dynamic-UI-Customizer/releases/new
2. Create tag: `v1.0.0`
3. Upload `gaming-chair.glb`
4. Use the release URL in your code
