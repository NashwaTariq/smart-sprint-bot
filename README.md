# 🚀 MCP Server – Sprint Smart Bot

A powerful orchestration platform for managing AI agents with real-time sprint planning, action execution, and seamless collaboration.

**Tech Stack**  
- 🧠 **Backend**: Python (FastAPI + LangChain)  
- 🎨 **Frontend**: Angular

---

## 📸 Screenshots

![Screenshot](https://drive.google.com/uc?export=view&id=1OTai-5KGNntX0LEDizXVtVgnTrcqdGxc)
![Screenshot](https://drive.google.com/uc?export=view&id=1UD_GruT5pfYvXX6KxnTrKWPcIAHrcAjz)
![Screenshot](https://drive.google.com/uc?export=view&id=14Seym4wJ9SUDbHMR6qtNlGqY2g7xMQC_)
![Screenshot](https://drive.google.com/uc?export=view&id=1OGlrgBPdDF3t__wIlUyOeWiOlDpN-zW1)

---

## ✨ Key Features

- 🤖 Agent orchestration with tool integrations  
- 🗂️ Smart sprint bot for intelligent task breakdown  
- 🧩 Modular config via intuitive web UI  
- 💬 Real-time response display and logging


---

## 🔜 Future Scaling

- Mail sprint status from JIRA to team
- Send daily JIRA report to team
- Github repo linked for any commit or open pull-requests
- Auto code review and send code review status via mail

---

## 🐋 Run via Docker

```
# Backend:
From backend folder:

docker build -t backend:latest .
docker run  -p 8000:80 --name container -d backend:latest 


# Frontend:
From frontend folder:

docker build -t frontend:latest .
docker run  -p 5555:80 --name container -d frontend:latest 

```

---

## 🛠️ Backend Setup (Python)

```bash
# 1. Clone the repo
git clone https://github.com/NashwaTariq/smart-sprint-bot
cd smart-sprint-bot/backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the server
uvicorn services.api:asgi_app --host 0.0.0.0 --port 8000
```


---

## 🛠️ Frontend Setup (Angular)

```bash
# 1. Clone the repo
git clone https://github.com/NashwaTariq/smart-sprint-bot
cd smart-sprint-bot/frontend

# 2. Install dependencies
npm i

# 3. Run locally
npm run start
```
