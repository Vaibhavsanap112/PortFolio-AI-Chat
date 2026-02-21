@echo off
REM Setup script for Windows
REM Portfolio AI Chat Application

echo 🚀 Setting up Portfolio AI Chat Application...

REM Check Node.js
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)
echo ✓ Node.js found

REM Check Python
echo Checking Python installation...
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)
echo ✓ Python found

REM Setup Backend
echo.
echo Setting up Backend...
cd backend

REM Create virtual environment
echo Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing backend dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠️  Please update .env with your OpenRouter API key
)

cd ..

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend

REM Install dependencies
echo Installing frontend dependencies...
call npm install

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo Creating .env.local file...
    copy .env.example .env.local
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your OpenRouter API key
echo 2. Update frontend\.env.local if needed
echo 3. Run backend: cd backend && venv\Scripts\activate && python app.py
echo 4. Run frontend: cd frontend && npm run dev
echo.
pause
