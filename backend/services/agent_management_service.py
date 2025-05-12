from datetime import datetime
from tools.jira_tool import test_jira_connection
from core.config import load_config, save_config, AgentConfig
from fastapi import HTTPException

def get_agent_status():
    try:
        config = load_config()
        # You can extend this with actual connection tests.
        return {
            "isConnected": True,
            "lastChecked": datetime.utcnow().isoformat(),
            "status": "online",
            "message": "Configuration loaded successfully.",
            "user": config.jira_user
        }
    except Exception as e:
        return {
            "isConnected": False,
            "lastChecked": datetime.utcnow().isoformat(),
            "status": "error",
            "message": str(e)
        }

def update_agent_config(config_data: dict):
    try:
        config = AgentConfig(**config_data)
        # Validate JIRA credentials
        if not test_jira_connection(config.jira_url, config.jira_user, config.jira_api_key):
            raise HTTPException(status_code=400, detail="Invalid JIRA credentials or unreachable JIRA server.")

        save_config(config)
        return {"message": "Configuration updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

