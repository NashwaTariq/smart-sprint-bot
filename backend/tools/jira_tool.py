from jira import JIRA
from core.config import JIRA_URL, EMAIL, API_TOKEN

def connect_to_jira():
    return JIRA(server=JIRA_URL, basic_auth=(EMAIL, API_TOKEN))

def get_my_issues():
    jira = connect_to_jira()
    issues = jira.search_issues('assignee=currentUser() ORDER BY created DESC', maxResults=5)
    return "\n".join([f"{issue.key}: {issue.fields.summary}" for issue in issues])

def guess_project(summary, all_projects):
    summary_lower = summary.lower()
    for project in all_projects:
        if project.name.lower() in summary_lower:
            return project
    return all_projects[0]  # fallback

def create_jira_issue(summary: str, description: str, issue_type: str = "Task"):
    jira = connect_to_jira()
    all_projects = jira.projects()

    selected_project = guess_project(summary, all_projects)

    new_issue = jira.create_issue(
        project=selected_project.key,
        summary=summary,
        description=description,
        issuetype={'name': issue_type}
    )

    return f"Issue created in '{selected_project.name}': {new_issue.key}"

def delete_jira_issue(issue_key: str):
    jira = connect_to_jira()

    try:
        issue = jira.issue(issue_key)
        issue.delete()
        return f"Issue '{issue_key}' deleted successfully."
    except Exception as e:
        return f"Failed to delete issue '{issue_key}': {str(e)}"