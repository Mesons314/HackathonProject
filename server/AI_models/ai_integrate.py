import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()


open_router_api = os.getenv("R1_destilled_model_key")
geckoapikey = os.getenv("open_gecko")

if not open_router_api or not geckoapikey:
    raise ValueError("Missing API keys. Check your .env file.")


response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {open_router_api}",
        "Content-Type": "application/json"
    },
    data= json.dumps({
        "model":"google/gemma-3-27b-it:free",
        "messages":[{
            "role": "user",
            "content":f"Write the python code for the analysis of solana prize in last one year here is gecko api key {geckoapikey} "
        }]
    })
)

try:
    response_json = response.json()
except json.JSONDecodeError:
    response_json = {"error": "Invalid JSON response from OpenRouter"}