# Importing the necessary modules
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Optional

# Replace 'model' with the actual path of your model script
from model import predict as model_predict

# Create FastAPI app
app = FastAPI()

# Allow CORS from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get('/')
def index():
    return {'message': 'This is a sentiment analysis model API.'}

# Predict route
@app.get('/predict')
def predict(text: Optional[str] = None):
    if text is None:
        raise HTTPException(status_code=400, detail="No text provided for analysis.")
    return {'text': text, 'sentiment': model_predict(text)}

# Server start-up
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
