import json
import os
import uuid
from datetime import datetime

SESSIONS_FILE = "sessions.json"

def load_sessions():
    if not os.path.exists(SESSIONS_FILE):
        return {"sessions": []}
    with open(SESSIONS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {"sessions": []}

def save_sessions(data):
    with open(SESSIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def create_session(title):
    session_id = str(uuid.uuid4())
    sessions = load_sessions()
    sessions["sessions"].append({
        "id": session_id,
        "title": title,
        "messages": [],
        "created_at": datetime.now().isoformat()
    })
    save_sessions(sessions)
    return session_id

def append_message(session_id, user_input, bot_response):
    sessions = load_sessions()

    # If sessions.json file was missing or empty, ensure base structure
    if "sessions" not in sessions:
        sessions["sessions"] = []

    # Try to find the session
    session_found = False
    for s in sessions["sessions"]:
        if s["id"] == session_id:
            s["messages"].append({
                "timestamp": datetime.now().isoformat(),
                "user": user_input,
                "bot": bot_response
            })
            session_found = True
            break

    # If session not found, create a new one with the given session_id
    if not session_found:
        sessions["sessions"].append({
            "id": session_id,
            "title": "Untitled Session",
            "messages": [{
                "timestamp": datetime.now().isoformat(),
                "user": user_input,
                "bot": bot_response
            }],
            "created_at": datetime.now().isoformat()
        })

def get_session_detail_by_id(session_id: str = 'default'):
    sessions = load_sessions()
    for s in sessions["sessions"]:
        if s["id"] == session_id:
            return s
    return None


