from flask import Flask, request, jsonify
from tools import jira_tool  # Import your existing jira_tool

app = Flask(__name__)  # Initialize Flask app

# Define a route to get JIRA issues
@app.route('/api/jira/issues', methods=['GET'])
def get_jira_issues():
    issues = jira_tool.get_my_issues()  # Call the existing function
    return jsonify(issues)  # Return issues as JSON

# Define a route to create a JIRA ticket
@app.route('/api/jira/ticket', methods=['POST'])
def create_jira_ticket():
    data = request.json  # Get JSON data from request
    summary = data.get('summary')  # Extract summary from the request
    if not summary:
        return jsonify({"error": "Summary is required"}), 400  # Error if summary is missing
    ticket = jira_tool.create_jira_issue(summary=summary, description="Auto-created from SmartSprintBot")
    return jsonify(ticket), 201  # Return created ticket as JSON

# Define a route to delete a JIRA ticket
@app.route('/api/jira/ticket/<string:key>', methods=['DELETE'])
def delete_jira_ticket(key):
    result = jira_tool.delete_jira_issue(key)  # Call the existing function
    return jsonify({"result": result})  # Return result as JSON

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode 