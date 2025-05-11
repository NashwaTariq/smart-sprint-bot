from pydantic import BaseModel

# Schemas

class AgentConfig(BaseModel):
    groqApiKey: str
    jiraApiKey: str
    jiraEmail: str
    jiraUrl: str


class TicketCreate(BaseModel):
    summary: str

class ChatAgent(BaseModel):
    query: str

class SessionCreate(BaseModel):
    title: str

class AgentConfig(BaseModel):
  groq_api_key: str
  jira_api_key: str
  jira_user: str
  jira_url: str