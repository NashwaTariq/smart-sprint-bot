from pydantic import BaseModel
# Schemas
class TicketCreate(BaseModel):
    summary: str

class ChatAgent(BaseModel):
    query: str

class SessionCreate(BaseModel):
    title: str

class AgentConfig(BaseModel):
    groq_api_key: str
    model_name: str
    jira_user: str = None