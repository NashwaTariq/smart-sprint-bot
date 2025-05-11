from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services import agent_management_service
from tools import jira_tool
from agent import ask_agent
from models.schemas import TicketCreate, ChatAgent, AgentConfig
from tools.session_tool import get_sessions

app = FastAPI()  # Initialize FastAPI app

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a route to get agent response
@app.post("/api/agents/ask")
async def get_agent_response(agent: ChatAgent):
    response = ask_agent(agent.query)
    return {"response": response, "status": "success"}


# Get session logs
@app.get("/api/sessions/logs")
async def get_session_logs():
    return get_sessions()

# Define a route to get JIRA issues
@app.get("/api/jira/issues")
async def get_jira_issues():
    issues = jira_tool.get_my_issues()
    return {"issues": issues}

# Define a route to create a JIRA ticket
@app.post("/api/jira/ticket")
async def create_jira_ticket(ticket: TicketCreate):
    if not ticket.summary:
        raise HTTPException(status_code=400, detail="Summary is required")
    ticket_result = jira_tool.create_jira_issue(summary=ticket.summary, description="Auto-created from SmartSprintBot")
    return {"ticket": ticket_result}

# Define a route to delete a JIRA ticket
@app.delete("/api/jira/ticket/{key}")
async def delete_jira_ticket(key: str):
    result = jira_tool.delete_jira_issue(key)
    return {"result": result}


@app.get("/api/agent/status")
async def get_status():
    return agent_management_service.get_agent_status()

@app.post("/api/agent/config")
async def update_config(config: AgentConfig):
    return agent_management_service.update_agent_config(config.dict())

# Create ASGI app for uvicorn
asgi_app = app

# Start the FastAPI app
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 