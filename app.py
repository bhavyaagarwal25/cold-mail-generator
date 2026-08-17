import streamlit as st
from google import genai
import os
import time

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

st.title("Cold Email Generator ✉️")

recipient_name = st.text_input("Recipient ka naam")
recipient_role = st.text_input("Recipient ka role")
company_name = st.text_input("Company ka naam")
sender_goal = st.text_input("Email ka goal kya hai")

tone = st.selectbox(
    "Email ka tone kaisa ho?",
    ["Formal", "Casual", "Direct"]
)

def generate_with_retry(prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=prompt
            )
            return response.text
        except Exception as e:
            if attempt < max_retries - 1:
                st.warning(f"Attempt {attempt + 1} failed, retrying...")
                time.sleep(3)
            else:
                st.error("Failed after multiple attempts. Please try again later.")
                return None

if st.button("Generate Email"):
    prompt = f"Write a short cold email to {recipient_name}, who is {recipient_role} at {company_name}. The goal is: {sender_goal}. The tone of the email should be {tone.lower()}."

    with st.spinner("Generating email..."):
        result = generate_with_retry(prompt)

    if result:
        st.subheader("Generated Email")
        st.write(result)