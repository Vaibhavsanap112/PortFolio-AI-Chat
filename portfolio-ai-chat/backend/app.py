from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "portfolio.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
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

class PortfolioData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    summary = db.Column(db.Text)
    resume_content = db.Column(db.Text)
    
    def to_dict(self):
        return {
            'fullName': self.full_name,
            'title': self.title,
            'email': self.email,
            'phone': self.phone,
            'summary': self.summary,
            'resumeContent': self.resume_content
        }

# Portfolio data sample
PORTFOLIO_DATA = """
FULL NAME: Viabhav Sanap
TITLE: Aspiring Developer
EMAIL: sanapvaibhav8767@gmail.com
PHONE: +1 (555) 123-4567

PROFESSIONAL SUMMARY:
Aspiring developer building web applications and exploring AI/ML. Currently focused on learning modern web stacks, creating personal projects, and contributing to open-source.

TECHNICAL SKILLS:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Python, Flask
- Databases: MongoDB, Firebase, SQL
- AI/ML: OpenAI API, clustering, NLP
- Other: Git, REST APIs

PROJECTS:
- Tiffin Service Management Website: Full-stack mess/tiffin management application with customer management, MongoDB storage, responsive React frontend, and Node.js/Express backend.
- Crime Prediction and Analysis System: Full-stack crime prediction and analysis platform using machine learning (K-means clustering), interactive React mapping/visualizations, Node.js/Express backend with MongoDB, and real-time geocoding.
- Movie Ticket Booking Platform (MERN): MERN stack movie ticketing platform with user auth, seat reservations, optimized MongoDB schemas, Inngest background jobs, and admin dashboard.

EXPERIENCE:
- Aspiring developer — self-directed learning and personal projects. Open to internships and entry-level roles.
"""

# OpenRouter API integration
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY', '')
MODEL = "meta-llama/llama-2-7b-chat"  # Free model from OpenRouter

def get_ai_response(user_message, chat_history):
    """Get response from OpenRouter API"""
    try:
        # If no API key, return a demo response
        if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == '':
            return get_demo_response(user_message)
        
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Portfolio AI Chat"
        }

        # Build conversation context with portfolio data
        system_prompt = f"""You are an AI assistant representing a professional portfolio. 
You have access to the following resume and portfolio information:

{PORTFOLIO_DATA}

Answer questions about this person's experience, skills, projects, and background.
Be professional, helpful, and accurate. If asked something not in the portfolio, 
politely indicate that you don't have that information."""

        # Prepare messages for API
        messages = [{"role": "user", "content": user_message}]
        
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json={
                "model": MODEL,
                "messages": messages,
                "system": system_prompt,
                "max_tokens": 500,
                "temperature": 0.7
            },
            timeout=30
        )
        
        if response.status_code == 200:
            data = response.json()
            return data['choices'][0]['message']['content']
        else:
            return get_demo_response(user_message)
    
    except Exception as e:
        print(f"Error calling OpenRouter API: {str(e)}")
        return get_demo_response(user_message)

def get_demo_response(user_message):
    """Return demo response when API is not available"""
    user_lower = user_message.lower()
    
    demo_responses = {
        'experience': "I'm an aspiring developer focused on building personal projects and learning modern web and AI tools. I don't have several years of industry experience yet, but I'm open to internships and entry-level roles.",
        'skills': "My skills include React and TypeScript for frontend work, Python and Flask for backend development, MongoDB and Firebase for data, and AI/ML topics like OpenAI APIs, clustering methods, and NLP.",
        'projects': "Key projects include a Tiffin Service Management Website (full-stack with React/Node/MongoDB), a Crime Prediction and Analysis System (ML with Python and scikit-learn plus React visualization), and a Movie Ticket Booking Platform (MERN).",
        'education': "I'm actively learning through personal projects and online courses; education and certifications can be listed on request.",
        'contact': "You can reach me at sanapvaibhav8767@gmail.com or call +1 (555) 123-4567.",
        'ai': "I work with AI tools and experiments—using OpenAI APIs and techniques like clustering and NLP for projects and prototypes.",
        'availability': "I'm currently open to internships and entry-level opportunities. Feel free to get in touch!",
    }

    for key, response in demo_responses.items():
        if key in user_lower:
            return response

    return f"Thanks for your question! Based on my portfolio information, I'm an aspiring developer building web and AI projects—ask me about my projects, skills, or how to get in touch."

# Routes
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """Get portfolio information"""
    return jsonify({
        'fullName': 'Viabhav Sanap',
        'title': 'Full Stack Developer & AI Enthusiast',
        'email': 'sanapvaibhav8767@gmail.com',
        'phone': '+1 (555) 123-4567',
        'summary': 'Aspiring developer building web and AI projects; focused on learning modern stacks, creating personal projects, and preparing for internships or entry-level roles.',
        'resumeContent': PORTFOLIO_DATA
    }), 200

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    """Handle chat messages"""
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        session_id = data.get('sessionId', 'default')
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Get chat history for context
        chat_history = ChatMessage.query.filter_by(session_id=session_id).order_by(ChatMessage.timestamp).all()
        
        # Get AI response
        ai_response = get_ai_response(user_message, chat_history)
        
        # Save to database
        message = ChatMessage(
            user_message=user_message,
            ai_response=ai_response,
            session_id=session_id
        )
        db.session.add(message)
        db.session.commit()
        
        return jsonify({
            'userMessage': user_message,
            'aiResponse': ai_response,
            'timestamp': datetime.utcnow().isoformat(),
            'sessionId': session_id
        }), 200
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat/history', methods=['GET'])
def get_chat_history():
    """Get chat history for a session"""
    session_id = request.args.get('sessionId', 'default')
    messages = ChatMessage.query.filter_by(session_id=session_id).order_by(ChatMessage.timestamp).all()
    return jsonify([msg.to_dict() for msg in messages]), 200

@app.route('/api/chat/clear', methods=['POST'])
def clear_chat():
    """Clear chat history"""
    session_id = request.json.get('sessionId', 'default')
    ChatMessage.query.filter_by(session_id=session_id).delete()
    db.session.commit()
    return jsonify({'success': True}), 200

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get portfolio projects"""
    projects = [
        {
            'id': 1,
            'title': 'Tiffin Service Management Website',
            'description': "Developed a full-stack mess management application that reduced manual record-keeping and improved administrator efficiency. Implemented customer management (add/update/delete), integrated MongoDB for secure tiffin/customer data storage, built a responsive React frontend, and engineered a secure Node.js & Express backend for scalable API operations.",
            'technologies': ['React', 'Node.js', 'Express', 'MongoDB'],
            'image': 'https://images.unsplash.com/photo-1544962386-1142f0f3e7b6?w=500&h=300&fit=crop',
            'link': '#',
            'github': '#'
        },
        {
            'id': 2,
            'title': 'Crime Prediction and Analysis System',
            'description': "Built a crime prediction and analysis platform using machine learning to aid public safety. Implemented predictive analytics with Python and scikit-learn (K-means clustering) to identify hotspots, created interactive React mapping and visualization components, and developed a Node.js/Express backend with MongoDB and real-time geocoding.",
            'technologies': ['Python', 'scikit-learn', 'React', 'Node.js', 'MongoDB'],
            'image': 'https://images.unsplash.com/photo-1581093588401-9f6a6d8a0b8e?w=500&h=300&fit=crop',
            'link': '#',
            'github': '#'
        },
        {
            'id': 3,
            'title': 'Movie Ticket Booking Platform (MERN)',
            'description': "Developed a MERN stack movie ticketing platform with user registration, movie browsing, seat reservation, and online payments. Designed scalable backend APIs, optimized MongoDB schemas, implemented secure authentication with Clerk, session management and role-based access, a 10-minute seat-lock system, and integrated Inngest for background jobs and an Admin Dashboard.",
            'technologies': ['MongoDB', 'Express', 'React', 'Node.js', 'Clerk', 'Inngest'],
            'image': 'https://images.unsplash.com/photo-1517604931442-7bd05f21f1aa?w=500&h=300&fit=crop',
            'link': '#',
            'github': '#'
        }
    ]
    return jsonify(projects), 200

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get skills breakdown"""
    skills = {
        'frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Vue.js'],
        'backend': ['Python', 'Flask', 'FastAPI', 'Node.js', 'Django', 'Express'],
        'databases': ['MongoDB', 'Firebase', 'SQL'],
        'ai_ml': ['OpenAI API', 'SentenceTransformers', 'clustering', 'NLP'],
        'tools': ['Git', 'VS Code', 'Figma', 'Postman', 'Linux', 'Agile']
    }
    return jsonify(skills), 200

@app.route('/api/experience', methods=['GET'])
def get_experience():
    """Get work experience"""
    experience = [
        {
            'id': 1,
            'title': 'Aspiring Developer',
            'company': 'Self-Directed Learning & Personal Projects',
            'duration': 'Present',
            'description': "Building personal projects, learning web development and AI. Open to internships and entry-level roles.",
            'technologies': ['React', 'TypeScript', 'Python']
        }
    ]
    return jsonify(experience), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
