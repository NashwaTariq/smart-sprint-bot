🚀 MCP Server – Smart Sprint Bot
A powerful orchestration platform for managing AI agents with real-time sprint planning, action execution, and seamless collaboration.
Built with:
🧠 Backend: Python (FastAPI + LangChain)
🎨 Frontend: Angular

📸 Screenshots
🔗 View Interface Screenshots (Google Drive)

🛠️ Features
Agent orchestration and multi-tool support

Smart sprint bot for task planning

Interactive UI with real-time agent responses

Project and tool configuration via web UI

▶️ Getting Started
Backend – Python (FastAPI)
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/NashwaTariq/smart-sprint-bot
cd smart-sprint-bot/backend

# 2. Set up virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run server
uvicorn services.api:asgi_app --host 0.0.0.0 --port 8000
Frontend – Angular
bash
Copy
Edit
# 1. Navigate to frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Run development server
ng serve
🔮 Future Enhancements
📬 GitHub Auto Code Review: Automatically send agent-generated code reviews via email.

📨 Sprint Summary Sharing: Share sprint plan summaries directly through email.

📅 Calendar Integration: Auto-schedule sprint review/discussion meetings.

🤝 Contributing
We welcome contributions! Create an issue or submit a PR to help improve the MCP Server.