from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel
from google import genai
import os
load_dotenv()
app = FastAPI()

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class EmailRequest(BaseModel):
    recipient_name: str
    recipient_role: str
    company_name: str
    sender_goal: str

@app.post("/generate")
def generate_email(request: EmailRequest):
    prompt = f"Write a short cold email to {request.recipient_name}, who is {request.recipient_role} at {request.company_name}. The goal is: {request.sender_goal}."

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return {"email": response.text}