from agent import ask_agent

if __name__ == "__main__":
    user_input = input("Ask SmartSprintBot: ")
    response = ask_agent(user_input)
    print(response)
