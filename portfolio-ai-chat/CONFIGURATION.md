# Configuration Guide

## Backend Configuration

### Flask Configuration

The backend uses Flask's configuration system. Key settings in `backend/app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
```

### Database

Currently uses SQLite for simplicity. To use PostgreSQL:

1. Install PostgreSQL and psycopg2:
   ```bash
   pip install psycopg2-binary
   ```

2. Update connection string in `.env`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
   ```

3. Update in `app.py`:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///portfolio.db')
   ```

### OpenRouter API Configuration

1. Get API key from https://openrouter.ai
2. Add to `.env`:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```

3. Change model in `app.py`:
   ```python
   MODEL = "meta-llama/llama-2-7b-chat"  # Change this
   ```

   Available free models:
   - `meta-llama/llama-2-7b-chat`
   - `mistralai/mistral-7b-instruct`
   - `nousresearch/nous-hermes-2-mistral-7b-dpo`

### CORS Configuration

Currently allows requests from localhost. For production:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Frontend Configuration

### Build Configuration (Vite)

Edit `frontend/vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend URL
        changeOrigin: true
      }
    }
  }
})
```

### Tailwind CSS Customization

Edit `frontend/tailwind.config.js` to customize colors, fonts, etc:

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#3b82f6',
      'secondary': '#8b5cf6',
    },
    fontFamily: {
      'sans': ['Inter', ...],
    }
  }
}
```

### Environment Variables

Create `frontend/.env.local`:

```
VITE_API_URL=http://localhost:5000/api  # Development
VITE_API_URL=https://api.yourdomain.com/api  # Production
```

## Portfolio Data Structure

Edit the resume content in `backend/app.py`:

```python
PORTFOLIO_DATA = """
FULL NAME: Your Name
TITLE: Your Title
EMAIL: your.email@domain.com
PHONE: +1 (555) 123-4567

PROFESSIONAL SUMMARY:
Your summary here...

TECHNICAL SKILLS:
- Frontend: ...
- Backend: ...

EXPERIENCE:
1. Your Job Title at Company (Year-Year)
   Description...
   Technologies: ...

PROJECTS:
1. Project Name
   Description...
   GitHub: ...

EDUCATION:
...
"""
```

## Chat Customization

### System Prompt

Edit the system prompt in `backend/app.py` function `get_ai_response()`:

```python
system_prompt = f"""You are an AI assistant representing [Your Name].
You have access to the following information:

{PORTFOLIO_DATA}

[Your custom instructions here...]"""
```

### Response Fallbacks

The demo responses in `get_demo_response()` are used when OpenRouter API is not available. Customize these to match your information.

## Performance Tuning

### Backend

1. **Gunicorn Workers** (for production):
   ```bash
   gunicorn --workers 4 --worker-class sync --worker-connections 1000 app:app
   ```

2. **Database Query Optimization**:
   ```python
   # Add indexes
   db.Index('idx_session_id', ChatMessage.session_id)
   ```

3. **Caching**:
   ```python
   from flask_caching import Cache
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   ```

### Frontend

1. **Code Splitting**: Vite does this automatically
2. **Image Optimization**: Use optimized images for project thumbnails
3. **Bundle Analysis**:
   ```bash
   npm install -D @vite/plugin-legacy
   # Check bundle size
   npm run build -- --analyze
   ```

## Security Configuration

### Backend Security

1. **CORS**: Only allow trusted origins
2. **Rate Limiting**:
   ```python
   from flask_limiter import Limiter
   limiter = Limiter(app)
   
   @limiter.limit("10 per minute")
   @app.route('/api/chat', methods=['POST'])
   def handle_chat():
       ...
   ```

3. **Input Validation**:
   ```python
   if len(user_message) > 2000:
       return jsonify({'error': 'Message too long'}), 400
   ```

4. **HTTPS Enforcement**:
   ```python
   @app.before_request
   def redirect_https():
       if not request.is_secure:
           url = request.url.replace('http://', 'https://', 1)
           return redirect(url, code=301)
   ```

### Frontend Security

1. **Content Security Policy**: Set in headers
2. **XSS Protection**: React automatically escapes content
3. **CSRF Protection**: Implement CSRF tokens if needed

## Logging Configuration

### Backend Logging

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
logger.info('Message here')
```

### Frontend Error Tracking

Use Sentry for production:

```bash
npm install --save @sentry/react @sentry/tracing
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  environment: "production"
});
```

## Monitoring

### Uptime Monitoring

- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **Healthchecks.io**: https://healthchecks.io

### Performance Monitoring

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org
- **New Relic**: https://newrelic.com

---

For more help, see the main README.md and individual component documentation.
