import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

recipient_name = "Priya Sharma"
recipient_role = "Engineering Manager"
company_name = "Zomato"
sender_goal = "applying for a backend developer internship"

prompt = f"""
Write a short cold email to {recipient_name}, who is {recipient_role}
at {company_name}. The goal is: {sender_goal}.
"""

response = client.models.generate_content(
    model="gemini-3.6-flash",
    contents=prompt
)

print(response.text)