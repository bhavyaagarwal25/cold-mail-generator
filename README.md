# Cold Email Generator 📧

A command-line tool that generates personalized cold emails using Google's Gemini API.

This project was built as a learning project to understand how to integrate an LLM into a real Python application — from making API calls and building dynamic prompts to generating useful output from the terminal.

---

## 🚀 What It Does

Cold Email Generator takes a few basic details about the person you want to contact and generates a personalized cold email.

You provide:

- Recipient's name
- Recipient's role
- Company name
- Your goal for reaching out

The application then creates a short, professional cold email using Google's Gemini API.

### Example Input

```text
Recipient ka naam: Priya Sharma
Recipient ka role: Engineering Manager
Company ka naam: Zomato
Email ka goal kya hai: Applying for a Backend Developer Internship
Subject: Backend Developer Internship Opportunity

### Example Output
```
Hi Priya,

I hope you're doing well. I'm reaching out to express my interest
in a Backend Developer Internship at Zomato.

I would love the opportunity to connect and discuss how my skills
and experience could contribute to your team.

Best regards,
Your Name
```
🛠️ Tech Stack
```
** Python
Google Gemini API
Google Gen AI SDK (google-genai)
python-dotenv
Dynamic Prompt Templating
Environment Variables
Python Virtual Environment (venv)
```
## ⚙️ How It Works
```
User Input
    ↓
Recipient + Role + Company + Goal
    ↓
Dynamic Prompt
    ↓
Google Gemini API
    ↓
Generated Cold Email
    ↓
Terminal Output
```
## Workflow
** The user provides recipient and email details.
** The application builds a dynamic prompt using Python f-strings.
** The prompt is sent to Google's Gemini API.
** Gemini generates a personalized cold email.
** The generated email is displayed in the terminal.

## 📁 Project Structure
```
cold-email-generator/
│
├── test.py
├── requirements.txt
├── README.md
├── .gitignore
├── .env
└── venv/
```

