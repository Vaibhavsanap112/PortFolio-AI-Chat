# Contributing

Thank you for your interest in contributing to Portfolio AI Chat! This project welcomes contributions from developers of all skill levels.

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-ai-chat.git
   cd portfolio-ai-chat
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set Up Development Environment**
   ```bash
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt

   # Frontend
   cd frontend
   npm install
   ```

## Making Changes

### Code Style

- **Python**: Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/)
  ```bash
  pip install black
  black app.py
  ```

- **JavaScript/TypeScript**: Follow [Prettier](https://prettier.io/) format
  ```bash
  npm install --save-dev prettier
  npx prettier --write src/
  ```

### Commit Messages

Use clear, descriptive commit messages:
```bash
git commit -m "feat: add dark mode toggle to chat component"
git commit -m "fix: resolve chat API timeout issue"
git commit -m "docs: update deployment guide"
git commit -m "style: format portfolio components"
```

### Testing

- Test locally before submitting PR
- Backend: `python -m pytest tests/`
- Frontend: `npm run test`

## Submitting Changes

1. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to the main repository on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Write a clear description of your changes
   - Link any related issues

3. **PR Guidelines**
   - One feature per PR
   - Clear description of changes
   - Tests included if applicable
   - Documentation updated

## Areas to Contribute

### 🎨 Frontend
- Improve responsive design
- Add new animations
- Optimize performance
- Add accessibility features
- Improve mobile experience

### 🐍 Backend
- Add more AI model integrations
- Improve chat context window
- Add database caching
- Implement rate limiting
- Add unit tests

### 📚 Documentation
- Improve README sections
- Add tutorials
- Create deployment guides
- Document API endpoints
- Add troubleshooting guides

### 🐛 Bug Fixes
- Test and report bugs
- Submit fixes for issues
- Improve error handling
- Add logging

## Development Workflow

### Running Both Servers Locally

**Option 1: Two Terminal Windows**
```bash
# Terminal 1
cd backend
source venv/bin/activate
python app.py

# Terminal 2
cd frontend
npm run dev
```

**Option 2: Docker Compose**
```bash
docker-compose up
```

### Common Commands

```bash
# Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate
python app.py              # Run server
python -m pytest           # Run tests
black app.py               # Format code

# Frontend
cd frontend
npm run dev                # Development server
npm run build              # Production build
npm run lint               # Check code style
npm test                   # Run tests
```

## Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create detailed bug report** including:
   - Description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/logs if applicable
   - Your environment (OS, Node/Python versions)

## Feature Requests

1. **Check existing issues** for similar requests
2. **Create discussion** with:
   - Description of desired feature
   - Use cases
   - Expected behavior
   - Why it's useful

## Project Structure

```
portfolio-ai-chat/
├── backend/
│   ├── app.py             # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # For containerization
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.tsx        # Main component
│   │   └── api.ts         # API integration
│   ├── package.json       # Node dependencies
│   └── Dockerfile         # For containerization
├── docs/                  # Documentation
└── docker-compose.yml     # Multi-container setup
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `backend/app.py` | Main server code, routes, AI integration |
| `frontend/src/App.tsx` | Main React component |
| `frontend/src/components/Chat.tsx` | Chat interface logic |
| `frontend/tailwind.config.js` | Styling configuration |
| `backend/requirements.txt` | Python dependencies |
| `frontend/package.json` | Node dependencies |

## Dependencies

### Backend
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin requests
- **Flask-SQLAlchemy**: Database ORM
- **requests**: HTTP calls to OpenRouter API

### Frontend
- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Axios**: HTTP client

## Code Review Process

1. Maintainers will review your PR
2. Provide feedback and suggestions
3. You make requested changes
4. PR is approved and merged

## Community

- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community server (if available)
- **Issues**: Report bugs and request features
- **Emails**: Direct contact through profile

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

- Check the main README.md
- Read QUICKSTART.md for setup help
- Check existing GitHub issues
- Create a new discussion

---

**Thank you for contributing!** 🎉

Your efforts help make this project better for everyone.
