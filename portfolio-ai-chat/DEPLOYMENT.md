# Deployment Guide

This guide covers how to deploy the Portfolio AI Chat application to the public internet.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Cloudflare Tunnel Setup](#cloudflare-tunnel-setup)
4. [GitHub Pages with Backend](#github-pages-with-backend)
5. [Docker Deployment](#docker-deployment)

## Backend Deployment

### Option 1: Railway (Recommended for simplicity)

1. Sign up at https://railway.app
2. Connect your GitHub repository
3. Create a new project and select Python
4. Add these environment variables:
   - `FLASK_ENV=production`
   - `OPENROUTER_API_KEY=your_key`
5. Deploy!

Railway will automatically detect `requirements.txt` and `app.py`

### Option 2: Heroku (Legacy but still works)

1. Sign up at https://www.heroku.com
2. Install Heroku CLI
3. Run:
   ```bash
   cd backend
   heroku login
   heroku create your-app-name
   heroku config:set OPENROUTER_API_KEY=your_key
   git push heroku main
   ```

### Option 3: Render

1. Sign up at https://render.com
2. Create a new Web Service
3. Connect your GitHub repository
4. Set Build Command: `pip install -r requirements.txt`
5. Set Start Command: `gunicorn app:app`
6. Add environment variables
7. Deploy!

### Option 4: AWS (Most control)

1. Create an EC2 instance (Ubuntu)
2. SSH into the instance
3. Install Python, pip, and nginx
4. Clone your repository
5. Set up virtual environment and install dependencies
6. Use systemd to manage Flask app
7. Configure nginx as reverse proxy
8. Get SSL certificate from Let's Encrypt

## Frontend Deployment

### Option 1: Vercel (Recommended - Built for Next.js/React)

1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Set Root Directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
5. Deploy!

### Option 2: Netlify

1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Set Build command: `npm run build` (in frontend directory)
4. Set Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy!

### Option 3: GitHub Pages

1. Add `homepage` to `frontend/package.json`:
   ```json
   "homepage": "https://yourusername.github.io/portfolio-ai-chat"
   ```

2. Create GitHub workflow (`.github/workflows/deploy-gh-pages.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: cd frontend && npm install && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

3. Enable GitHub Pages in repository settings (source: gh-pages branch)

### Option 4: Azure Static Web Apps

1. Sign up at https://azure.microsoft.com
2. Create Static Web App resource
3. Connect GitHub repository
4. Set App location: `frontend`
5. Set Build output location: `dist`
6. Deploy!

## Cloudflare Tunnel Setup (Free Public Access)

### Installation & Setup

1. Install Cloudflare CLI:
   ```bash
   # Windows
   Download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

   # macOS
   brew install cloudflare/warp/cloudflared

   # Linux
   wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared-linux-amd64.deb
   ```

2. Authenticate:
   ```bash
   cloudflared tunnel login
   ```

3. Create tunnels:
   ```bash
   # For backend
   cloudflared tunnel create portfolio-backend
   
   # For frontend
   cloudflared tunnel create portfolio-frontend
   ```

4. Create `config.yml` in `~/.cloudflared/`:
   ```yaml
   tunnel: portfolio-backend
   credentials-file: /path/to/credentials/UUID.json
   
   ingress:
     - hostname: backend.example.com
       service: http://localhost:5000
     - service: http_status:404
   ```

5. Routes:
   ```bash
   cloudflared tunnel route dns portfolio-backend backend.example.com
   cloudflared tunnel route dns portfolio-frontend frontend.example.com
   ```

6. Run tunnels:
   ```bash
   # Terminal 1
   cloudflared tunnel run portfolio-backend
   
   # Terminal 2
   cloudflared tunnel run portfolio-frontend
   ```

7. Add to systemd (auto-start on Linux):
   ```bash
   sudo cloudflared service install
   sudo systemctl start cloudflared
   ```

## Docker Deployment

### Build & Run Locally

```bash
# Build images
docker-compose build

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Deploy to Docker Hub

```bash
# Tag images
docker tag portfolio-ai-chat:latest yourusername/portfolio-backend:latest
docker tag portfolio-ai-chat:latest yourusername/portfolio-frontend:latest

# Push to Docker Hub
docker push yourusername/portfolio-backend:latest
docker push yourusername/portfolio-frontend:latest
```

### Deploy to Container Services

- **AWS ECS**: Push to ECR, create ECS service
- **Google Cloud Run**: `gcloud run deploy`
- **Azure Container Instances**: Azure Portal or CLI
- **DigitalOcean App Platform**: Connect GitHub, auto-deploy

## Production Checklist

- [ ] Update API URLs in frontend for production backend
- [ ] Set environment variables securely
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Add rate limiting to API
- [ ] Set up monitoring and logging
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Test chat functionality
- [ ] Set up CI/CD pipeline
- [ ] Add custom domain
- [ ] Set up email notifications

## Environment Variables Checklist

### Backend (.env)
```
FLASK_ENV=production
FLASK_DEBUG=False
OPENROUTER_API_KEY=your_key
```

### Frontend (.env.local)
```
VITE_API_URL=https://api.yourdomain.com/api
```

## Monitoring & Maintenance

### Logging
- Backend: Check application logs for errors
- Frontend: Use browser DevTools console
- Cloud provider: Use built-in logging services

### Updates
- Keep dependencies updated: `npm update`, `pip install --upgrade`
- Monitor OpenRouter API usage
- Check error logs regularly

### Performance
- Use CDN for static assets (Cloudflare)
- Enable caching headers
- Monitor API response times
- Profile frontend performance

---

For more help, see the main README.md and OpenRouter API documentation.
