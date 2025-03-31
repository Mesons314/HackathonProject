from fastapi import FastAPI, HTTPException
import uvicorn
from ai_integrate import response,response_json
from EDA import extraction_of_code

async def lifespan(app: FastAPI):
    print("Started the server")
    yield
    print("Stoped the server")

app = FastAPI(lifespan=lifespan)

@app.get('/AI')
def home():
    try:

        return response_json
    except HTTPException as e:
        return {"error": f"You the error as {e}"}
    
@app.get('/AI/EDA')
async def python():
    await extraction_of_code()

if __name__ == "__main__":
    uvicorn.run("main:app",host='127.0.0.1',reload=True)