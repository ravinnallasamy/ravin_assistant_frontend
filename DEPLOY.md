# Ravin-Assistant - Frontend Deployment Guide

## Deploy to Netlify

### Step 1: Build Locally (Optional Test)
```bash
cd frontend
npm install
npm run build
```

### Step 2: Deploy to Netlify

#### Option A: Netlify CLI (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
cd frontend
netlify deploy --prod
```

#### Option B: Netlify Dashboard
1. Go to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Click "Deploy site"

### Step 3: Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:

```
VITE_API_URL=https://your-backend-app.onrender.com
```

### Step 4: Custom Domain (Optional)
- Go to Domain settings
- Add your custom domain
- Update DNS records as instructed

## Important Notes
- The `netlify.toml` file is already configured for SPA routing
- Favicon will automatically update from your profile photo
- Title is set to "Ravin-Assistant"
- Free tier includes:
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Continuous deployment from Git

## Testing
After deployment, test:
1. Homepage loads correctly
2. Profile photo appears as favicon
3. Q&A functionality works
4. Voice recording works
5. Admin dashboard accessible
