from langchain_groq import ChatGroq
from langchain.agents import initialize_agent, AgentType
from langchain.tools import Tool
from tools.session_tool import append_message 

from tools import jira_tool
from core.config import GROQ_API_KEY, MODEL_NAME

# Define tools for LangChain agent
jira_tools = [
    Tool(
        name="GetMyJiraIssues",
        func=lambda _: jira_tool.get_my_issues(),
        description="Use this to get issues assigned to the current user in JIRA"
    ),
    Tool(
        name="CreateJiraTicket",
        func=lambda input: jira_tool.create_jira_issue(
            summary=input,
            description="Auto-created from SmartSprintBot"
        ),
        description="Use this to create a new JIRA ticket with a summary"
    ),
    Tool(
        name="DeleteJiraTicket",
        func=lambda input: jira_tool.delete_jira_issue(input),
        description="Use this to delete a JIRA ticket with a key"
    )
]

# Set up Groq LLM
llm = ChatGroq(api_key=GROQ_API_KEY, model_name=MODEL_NAME)

# Initialize LangChain agent with tools
agent = initialize_agent(
    tools=jira_tools,
    llm=llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)

# Public function to ask the agent
def ask_agent(prompt: str, session_id: str = 'default') -> str:
    response = agent.run(prompt)
    append_message(session_id, prompt, response)
    return response