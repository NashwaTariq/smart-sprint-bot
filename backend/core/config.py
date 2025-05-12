import json
import os
from pathlib import Path
from dotenv import load_dotenv
from models.schemas import AgentConfig

# Load .env file if it exists
load_dotenv()

CONFIG_PATH = Path("core/agent_config.json")

# Load configuration from JSON or fallback to .env
def load_config() -> AgentConfig:
    if CONFIG_PATH.exists():
        try:
            with open(CONFIG_PATH, "r") as f:
                data = json.load(f)
            return AgentConfig(**data)
        except Exception as e:
            return get_default_config()
    else:
        return get_default_config()
       
def get_default_config():
    return AgentConfig(
        groq_api_key=os.getenv("GROQ_API_KEY", ""),
        jira_api_key=os.getenv("API_TOKEN", ""),
        jira_user=os.getenv("JIRA_EMAIL", ""),
        jira_url=os.getenv("JIRA_URL", ""),
    )

def save_config(config: AgentConfig):
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_PATH, "w") as f:
        json.dump(config.dict(), f, indent=2)

# Load once and expose individual variables
_config = load_config()

GROQ_API_KEY = _config.groq_api_key
JIRA_API_KEY = _config.jira_api_key
EMAIL = _config.jira_user
JIRA_URL = _config.jira_url
API_TOKEN = os.getenv("API_TOKEN", "")
MODEL_NAME = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")
