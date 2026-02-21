from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

# ----------------------------
# Database configuration
# ----------------------------
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "portfolio.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ----------------------------
# Models
# ----------------------------
class ChatMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_message = db.Column(db.String(2000), nullable=False)
    ai_response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    session_id = db.Column(db.String(100), default='default')

    def to_dict(self):
        return {
            'id': self.id,
            'userMessage': self.user_message,
            'aiResponse': self.ai_response,
            'timestamp': self.timestamp.isoformat(),
            'sessionId': self.session_id
        }

# ----------------------------
# Portfolio Data
# ----------------------------
PORTFOLIO_DATA = """
FULL NAME: Vaibhav Sanap
TITLE: Aspiring Developer
EMAIL: sanapvaibhav8767@gmail.com

PROFESSIONAL SUMMARY:
Aspiring developer building web applications and exploring AI/ML.
Focused on modern web stacks and real-world projects.

PROJECTS:
- Tiffin Service Management Website (MERN)
- Crime Prediction and Analysis System (ML + React)
- Movie Ticket Booking Platform (MERN)
"""

# ----------------------------
# OpenRouter Setup
# ----------------------------
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '').strip()
MODEL = "openai/gpt-3.5-turbo"

def get_ai_response(user_message):
    try:
        if not OPENROUTER_API_KEY:
            return "AI API key not configured."

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://portfolio-ai-chat.vercel.app",
            "X-Title": "Portfolio AI Chat"
        }

        system_prompt = f"""
You are an AI assistant representing this portfolio:

{PORTFOLIO_DATA}

Answer professionally based only on the provided information.
"""

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json={
                "model": MODEL,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message}
                ],
                "max_tokens": 500,
                "temperature": 0.7
            },
            timeout=30
        )

        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            print("OpenRouter Error:", response.text)
            return "Sorry, AI service is currently unavailable."

    except Exception as e:
        print("AI Error:", str(e))
        return "Sorry, something went wrong."

# ----------------------------
# Routes
# ----------------------------

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        session_id = data.get('sessionId', 'default')

        if not user_message:
            return jsonify({'error': 'Empty message'}), 400

        ai_response = get_ai_response(user_message)

        message = ChatMessage(
            user_message=user_message,
            ai_response=ai_response,
            session_id=session_id
        )
        db.session.add(message)
        db.session.commit()

        return jsonify({
            "userMessage": user_message,
            "aiResponse": ai_response,
            "timestamp": datetime.utcnow().isoformat(),
            "sessionId": session_id
        })

    except Exception as e:
        print("Chat Endpoint Error:", str(e))
        return jsonify({'error': str(e)}), 500


@app.route('/api/projects', methods=['GET'])
def projects():
    return jsonify([
        {
            "id": 1,
            "title": "Tiffin Service Management Website",
            "description": "Full-stack MERN application for mess management.",
            "technologies": ["React", "Node.js", "MongoDB"],
            "image": "",
            "link": "#",
            "github": "#"
        },
        {
            "id": 2,
            "title": "Crime Prediction and Analysis System",
            "description": "Machine learning based crime hotspot prediction platform.",
            "technologies": ["Python", "React", "MongoDB"],
            "image": "",
            "link": "#",
            "github": "#"
        },
        {
            "id": 3,
            "title": "Movie Ticket Booking Platform (MERN)",
            "description": "Online movie booking system with seat reservation.",
            "technologies": ["MongoDB", "Express", "React", "Node.js"],
            "image": "#",
            "link": "#",
            "github": "#"
        }
    ])


@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    return jsonify({
        'fullName': 'Vaibhav Sanap',
        'title': 'Aspiring Developer',
        'email': 'sanapvaibhav8767@gmail.com',
        'phone': '',
        'summary': 'Aspiring developer building web and AI projects.',
        'resumeContent': PORTFOLIO_DATA
    }), 200


@app.route('/api/skills', methods=['GET'])
def get_skills():
    return jsonify({
        'frontend': ['React', 'TypeScript', 'Tailwind CSS'],
        'backend': ['Python', 'Flask', 'Node.js'],
        'databases': ['MongoDB', 'SQL'],
        'devops': [],
        'ai_ml': ['OpenAI API', 'NLP'],
        'tools': ['Git', 'VS Code']
    }), 200


@app.route('/api/experience', methods=['GET'])
def get_experience():
    return jsonify([
        {
            'id': 1,
            'title': 'Aspiring Developer',
            'company': 'Self Projects',
            'duration': 'Present',
            'description': 'Building full stack and AI projects.',
            'technologies': ['React', 'Python']
        }
    ]), 200


# ----------------------------
# IMPORTANT: Create Tables (Railway Fix)
# ----------------------------
with app.app_context():
    db.create_all()

# ----------------------------
# Run Locally
# ----------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))