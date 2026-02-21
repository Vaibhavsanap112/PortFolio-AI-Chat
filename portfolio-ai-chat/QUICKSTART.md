# Quick Start Guide

Get your Portfolio AI Chat running in 5 minutes!

## Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **Python** 3.8+ ([Download](https://www.python.org/))
- **Git** ([Download](https://git-scm.com/))
- **OpenRouter API Key** ([Free signup](https://openrouter.ai/)) - Optional but recommended

## 1️⃣ Clone & Setup

### Windows
```bash
cd portfolio-ai-chat
setup.bat
```

### macOS/Linux
```bash
cd portfolio-ai-chat
chmod +x setup.sh
./setup.sh
```

### Manual Setup (All Platforms)

```bash
# Backend
cd backend
python -m venv venv

# Activate virtual environment
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

pip install -r requirements.txt

# Frontend (in another terminal)
cd frontend
npm install
```

## 2️⃣ Configure API Key

Edit `backend/.env`:
```env
OPENROUTER_API_KEY=your_api_key_here
FLASK_ENV=development
FLASK_DEBUG=True
```

Get free API key at https://openrouter.ai

## 3️⃣ Start Development Servers

### Terminal 1 - Backend
```bash
cd backend
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
python app.py
```

You should see: "Running on http://127.0.0.1:5000"

### Terminal 2 - Frontend  
```bash
cd frontend
npm run dev
```

You should see: "Local: http://localhost:3000"

## 4️⃣ Open in Browser

Visit **http://localhost:3000** and start chatting! 🎉

## ✨ Features to Try

- 📝 Scroll through portfolio sections (About, Experience, Projects, Skills)
- 💬 Click the chat button in bottom right
- 🤖 Ask anything about the person's experience, projects, skills
- 🎨 Responsive design works on mobile/tablet
- ⚡ Smooth animations throughout

## 🚀 Personalize Your Portfolio

Edit these files to make it yours:

### Your Information
`backend/app.py` - Update `PORTFOLIO_DATA` variable:
- Name, title, email, phone
- Professional summary
- Skills list
- Work experience
- Projects with links
- Education

### Your Projects
`backend/app.py` - Update the `get_projects()` function:
- Project title and description
- Technologies used
- Project image URL
- GitHub link
- Live demo link

### Styling
`frontend/tailwind.config.js` - Customize colors, fonts, animations

`frontend/src/index.css` - Add custom CSS

### Chat Behavior
`backend/app.py` - Edit `system_prompt` to change how AI responds

## 🔧 Troubleshooting

### Backend won't start
```bash
# Make sure you're in the backend directory
cd backend

# Check Python version
python --version  # Should be 3.8+

# Make sure virtual environment is activated
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate

# Try reinstalling dependencies
pip install -r requirements.txt

# Run directly
python app.py
```

### Frontend won't start
```bash
# Make sure you're in the frontend directory
cd frontend

# Check Node version
node --version  # Should be 16+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Start development server
npm run dev
```

### Chat not working
1. Check backend is running on port 5000
2. Check browser console for CORS errors (F12)
3. Try without API key (demo responses work)
4. Check .env file has correct API key

### API key errors
1. Sign up at https://openrouter.ai
2. Go to API Keys section
3. Copy your API key
4. Paste into `backend/.env`
5. Restart backend server

## 📦 Deploy to Internet

### Free Option: Cloudflare Tunnel
```bash
# Install cloudflare tunnel
# see DEPLOYMENT.md for instructions

# Run tunnels
cloudflared tunnel run portfolio-backend
cloudflared tunnel run portfolio-frontend
```

### Easy Option: Railway
1. Push to GitHub
2. Go to https://railway.app
3. New project → import from GitHub
4. Add `OPENROUTER_API_KEY` environment variable
5. Deploy!

See `DEPLOYMENT.md` for more options.

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Deployment Guide](./DEPLOYMENT.md) - Deploy to production
- [Configuration Guide](./CONFIGURATION.md) - Advanced customization
- [OpenRouter Docs](https://openrouter.ai/docs) - AI model options

## 💡 Tips

- **Multiple versions**: Duplicate the project folder to test different designs
- **Custom domain**: After deploying, buy a domain and point to it
- **Dark mode**: Built-in! Automatically follows system preference
- **Mobile friendly**: Test on phone by visiting `your-ip:3000`
- **Share portfolio**: Get a shareable link with Cloudflare Tunnel or deploying

## 🎯 Next Steps

1. ✅ Get it running locally
2. 📝 Update portfolio information
3. 🖼️ Add your project screenshots
4. 🚀 Deploy to Cloudflare Tunnel for public access
5. 🌐 Get custom domain (optional)
6. 📢 Share with recruiters/clients

---

**Need help?** See README.md or check GitHub Issues if deploying.

**Happy coding!** 🚀
