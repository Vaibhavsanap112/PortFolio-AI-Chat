# Project Structure

```
portfolio-ai-chat/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md               # Quick setup guide (START HERE!)
├── 📄 DEPLOYMENT.md               # Deployment instructions
├── 📄 CONFIGURATION.md            # Configuration options
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 docker-compose.yml          # Docker multi-container setup
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 backend/                    # Python Flask Backend
│   ├── 📄 app.py                  # Main Flask application (500+ lines)
│   │   ├── Models: ChatMessage, PortfolioData
│   │   ├── Routes: /api/health, /api/chat, /api/portfolio, etc.
│   │   ├── AI Integration: OpenRouter API
│   │   └── Demo responses for fallback
│   │
│   ├── 📄 requirements.txt         # Python dependencies
│   ├── 📄 .env                     # Environment variables (CREATE THIS)
│   ├── 📄 .env.example             # Example environment variables
│   ├── 📄 Dockerfile               # Docker image for backend
│   ├── 📄 .gitignore               # Python-specific ignores
│   └── portfolio.db                # SQLite database (auto-created)
│
├── 📁 frontend/                   # React + TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📄 main.tsx             # React entry point
│   │   ├── 📄 App.tsx              # Main App component (loads all sections)
│   │   ├── 📄 index.css            # Global styles + animations
│   │   ├── 📄 api.ts               # API integration & types
│   │   │
│   │   └── 📁 components/
│   │       ├── 📄 Navigation.tsx    # Navigation bar (sticky, responsive)
│   │       ├── 📄 Hero.tsx          # Hero section with intro & image
│   │       ├── 📄 About.tsx         # About section with highlights
│   │       ├── 📄 Experience.tsx    # Work experience timeline
│   │       ├── 📄 Projects.tsx      # Project showcase grid
│   │       ├── 📄 Skills.tsx        # Technical skills categories
│   │       ├── 📄 Chat.tsx          # AI Chat interface
│   │       └── 📄 Footer.tsx        # Footer with social links
│   │
│   ├── 📄 package.json             # Node dependencies & scripts
│   ├── 📄 tsconfig.json            # TypeScript configuration
│   ├── 📄 tsconfig.node.json       # TypeScript for Vite config
│   ├── 📄 vite.config.ts           # Vite build configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS customization
│   ├── 📄 postcss.config.js        # PostCSS configuration
│   ├── 📄 index.html               # HTML entry point
│   ├── 📄 .env.example             # Example frontend env variables
│   ├── 📄 Dockerfile               # Docker image for frontend
│   ├── 📄 .gitignore               # Node/React-specific ignores
│   └── dist/                       # Build output (auto-created)
│
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 deploy.yml           # GitHub Actions CI/CD pipeline
│
├── 📁 docs/                       # Additional documentation
│   └── (future guides)
│
└── 📁 scripts/
    ├── 📄 setup.sh                # Setup script for macOS/Linux
    └── 📄 setup.bat               # Setup script for Windows
```

## Key Components Overview

### Backend (Flask)

```
app.py
├── Database Models
│   ├── ChatMessage: Stores user/AI messages
│   └── PortfolioData: Stores portfolio information
│
├── API Routes (/api/)
│   ├── GET  /health              # Health check
│   ├── GET  /portfolio            # Get portfolio info
│   ├── POST /chat                 # Send chat message
│   ├── GET  /chat/history         # Get chat history
│   ├── POST /chat/clear           # Clear history
│   ├── GET  /projects             # Get projects list
│   ├── GET  /skills               # Get skills
│   └── GET  /experience           # Get work experience
│
├── AI Integration
│   ├── OpenRouter API calls
│   ├── System prompts
│   └── Demo responses (fallback)
│
└── Data
    ├── PORTFOLIO_DATA constant: Complete resume info
    └── Sample projects & experience
```

### Frontend (React)

```
App.tsx (Main component)
├── State Management
│   ├── Portfolio data (experience, projects, skills)
│   └── Chat window state
│
├── Components Loaded
│   ├── Navigation: Top bar with menu
│   ├── Hero: Introduction & profile
│   ├── About: Summary & highlights
│   ├── Experience: Work history
│   ├── Projects: Project showcase
│   ├── Skills: Technical skills
│   ├── Footer: Links & info
│   └── Chat: AI chat window
│
├── Features
│   ├── Responsive design (mobile-first)
│   ├── Smooth animations
│   ├── Dark theme
│   └── Interactive chat
│
└── Styling
    ├── Tailwind CSS classes
    ├── Framer Motion animations
    └── Custom CSS effects
```

## Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Database** | SQLite | Store chat history & portfolio data |
| **Backend** | Python 3.8+ | Process requests & integrate AI |
| **Framework** | Flask | RESTful API server |
| **API Integration** | OpenRouter | AI chat completions |
| **Frontend** | React 18+ | User interface |
| **Language** | TypeScript | Type-safe frontend code |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animations** | Framer Motion | Smooth transitions & effects |
| **Build Tool** | Vite | Fast frontend build |
| **Icons** | Lucide React | Beautiful SVG icons |

## Development Workflow

```
User interacts with Frontend
    ↓
React component (e.g., Chat.tsx) handles event
    ↓
api.ts sends HTTP request to Flask backend
    ↓
Flask app.py processes request
    ↓
Calls OpenRouter API if needed
    ↓
Returns JSON response
    ↓
React displays response with animations
    ↓
User sees updated UI
```

## File Sizes (Approximate)

- `backend/app.py`: ~500 lines (all backend logic)
- `frontend/src/components/`: ~300 lines total
- `frontend/tailwind.config.js`: ~50 lines
- `package.json` (frontend): ~30 dependencies
- `requirements.txt` (backend): ~7 dependencies

## Getting Around the Codebase

### To Add a New Portfolio Section:
1. Create new component in `frontend/src/components/`
2. Import in `frontend/src/App.tsx`
3. Add to main render
4. Style with Tailwind CSS

### To Modify Chat Behavior:
1. Edit system prompt in `backend/app.py`
2. Adjust response parsing
3. Update `frontend/src/components/Chat.tsx` UI if needed

### To Change Styling:
1. Modify `frontend/tailwind.config.js` for colors & spacing
2. Update `frontend/src/index.css` for animations
3. Edit component className attributes
4. Use `npm run dev` to see changes live

### To Update Portfolio Info:
1. Edit `PORTFOLIO_DATA` in `backend/app.py`
2. Update projects in `get_projects()` function
3. Restart backend
4. Frontend automatically loads new data via API

## Environment Variables

### Backend (.env)
```
FLASK_ENV=development|production
FLASK_DEBUG=True|False
OPENROUTER_API_KEY=your_key_here
DATABASE_URL=sqlite:///portfolio.db
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## Database Schema

### ChatMessage Table
```sql
CREATE TABLE chat_message (
    id INTEGER PRIMARY KEY,
    user_message VARCHAR(2000) NOT NULL,
    ai_response TEXT NOT NULL,
    timestamp DATETIME DEFAULT NOW(),
    session_id VARCHAR(100)
)
```

### PortfolioData Table
```sql
CREATE TABLE portfolio_data (
    id INTEGER PRIMARY KEY,
    full_name VARCHAR(100),
    title VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    summary TEXT,
    resume_content TEXT
)
```

## API Endpoints Reference

```
GET  /api/health               → {"status": "healthy"}
GET  /api/portfolio            → Portfolio object
GET  /api/projects             → [Project, ...]
GET  /api/skills               → {frontend: [...], backend: [...], ...}
GET  /api/experience           → [Experience, ...]

POST /api/chat                 → {"userMessage": "...", "aiResponse": "..."}
GET  /api/chat/history         → [Message, ...]
POST /api/chat/clear           → {"success": true}
```

---

This structure keeps everything organized and scalable! 🚀
