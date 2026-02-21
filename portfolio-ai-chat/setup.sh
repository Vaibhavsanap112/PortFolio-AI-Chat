#!/bin/bash

echo "🚀 Setting up Portfolio AI Chat Application..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version) found${NC}"

# Check if Python is installed
echo -e "${BLUE}Checking Python installation...${NC}"
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi
echo -e "${GREEN}✓ Python $(python3 --version) found${NC}"

# Setup Backend
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
echo "Installing backend dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update .env with your OpenRouter API key${NC}"
fi

cd ..

# Setup Frontend
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
fi

cd ..

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Update backend/.env with your OpenRouter API key"
echo "2. Update frontend/.env.local if needed"
echo "3. Run: npm run dev:all (or run frontend and backend separately)"
echo ""
echo "Backend: cd backend && source venv/bin/activate && python app.py"
echo "Frontend: cd frontend && npm run dev"
