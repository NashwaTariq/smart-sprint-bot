from datetime import datetime
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
            "message": "Configuration loaded successfully."+config.jira_user
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
        save_config(config)
        return {"message": "Configuration updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
