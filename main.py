from fastapi import FastAPI
from database import engine, get_db, Base
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from auth import hash_password, verify_password, create_access_token
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from pydantic import BaseModel
from google import genai
from model import User
import os
load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

class SignupRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/signup")
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=request.email,
        hashed_password=hash_password(request.password)
    )
    db.add(new_user)
    db.commit()
    return {"message": "Signup successful"}

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
class EmailRequest(BaseModel):
    recipient_name: str
    recipient_role: str
    company_name: str
    sender_goal: str
    tone: str

@app.post("/generate")
def generate_email(request: EmailRequest):
    prompt = f"Write a short cold email to {request.recipient_name}, who is {request.recipient_role} at {request.company_name}. The goal is: {request.sender_goal}. The tone of the email should be {request.tone.lower()}."

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return {"email": response.text}