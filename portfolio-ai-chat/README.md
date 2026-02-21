# Portfolio AI Chat

A beautiful, modern portfolio website with AI chat functionality that allows visitors to interact with your resume and ask questions about your experience and projects.

## 🚀 Features

- **Modern Portfolio Design**: Stunning, responsive UI built with React and Tailwind CSS
- **AI Chat Assistant**: OpenRouter-powered AI chat that understands your resume
- **Full Stack Application**: React frontend + Python Flask backend
- **Real-time Chat**: Interactive chat with message history
- **Project Showcase**: Beautiful project cards with descriptions and links
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Smooth Animations**: Framer Motion animations throughout
- **Professional Layout**: Multiple sections including About, Experience, Projects, and Skills

## 🛠️ Tech Stack

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide Icons for beautiful icons
- Axios for API communication
- Vite as build tool

### Backend
- Python 3.8+
- Flask web framework
- Flask-SQLAlchemy for database ORM
- Flask-CORS for cross-origin requests
- Requests library for OpenRouter API integration
- SQLite database

### API
- OpenRouter API for AI chat (free models available)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create and activate virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file:
```bash
cp .env .env.local
```

5. Add your OpenRouter API key to .env:
```
OPENROUTER_API_KEY=your_api_key_here
```

6. Run the backend:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Backend (Python Flask)
- Deploy to Heroku, Railway, Render, or any Python hosting
- Ensure environment variables are set in production

### Frontend (React)
- Build with `npm run build`
- Deploy to Vercel, Netlify, GitHub Pages, or any static hosting
- Update API URL in environment variables

### Using Cloudflare Tunnel (Bonus)
For free public access without traditional hosting:

1. Install Cloudflare Tunnel CLI:
```bash
# Visit https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/
```

2. Run tunnel for backend:
```bash
cloudflared tunnel run portfolio-backend --url http://localhost:5000
```

3. Run tunnel for frontend:
```bash
cloudflared tunnel run portfolio-frontend --url http://localhost:3000
```

4. Update frontend API URL to the Cloudflare tunnel URL

## 📝 Customization

### Update Portfolio Information
Edit the `PORTFOLIO_DATA` string in `backend/app.py` with your actual information:
- Name, title, contact info
- Professional summary
- Technical skills
- Work experience
- Projects

### Customize Styling
- Modify colors in `frontend/tailwind.config.js`
- Update animations in `frontend/src/index.css`
- Adjust responsive breakpoints as needed

### Add Your Projects
Update the projects endpoint in `backend/app.py` to include your actual projects with descriptions, images, and links

## 🔑 OpenRouter API

To get an OpenRouter API key:
1. Visit https://openrouter.ai
2. Sign up for a free account
3. Go to API Keys section
4. Copy your API key to the `.env` file

### Free Models Available
- Llama 2 7B Chat
- Mistral 7B
- And many others (check OpenRouter docs)

## 🎨 UI Components

The portfolio includes:
- **Navigation Bar**: Sticky header with smooth navigation
- **Hero Section**: Eye-catching introduction with animated text
- **About Section**: Personal summary with highlights
- **Experience Timeline**: Professional work history
- **Projects Grid**: Showcase of your best work
- **Skills Section**: Categorized technical skills
- **Chat Interface**: Beautiful, animated chat window
- **Footer**: Social links and quick navigation

## 📱 Responsive Design

- Desktop (1024px+): Full layout with all features
- Tablet (768px-1023px): Optimized grid layouts
- Mobile (< 768px): Stack layout with touch-optimized buttons

## 🐛 Troubleshooting

### Backend not connecting
- Ensure Flask is running on port 5000
- Check CORS is enabled in Flask app
- Verify API URL in frontend is correct

### Chat not responding
- Check OpenRouter API key is valid
- Verify internet connection
- Check backend logs for error messages
- Try without API key to see demo responses

### Build errors
- Clear `node_modules` and reinstall: `npm install`
- Clear Python cache: `find . -type d -name __pycache__ -exec rm -r {} +`
- Ensure correct Python and Node versions

## 📄 License

This project is open source and available under the MIT License

## 🤝 Contributing

Feel free to fork, modify, and improve this portfolio template!

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ by Alex Chen**
