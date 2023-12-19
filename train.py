from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Load the model
model = joblib.load('random_forest.joblib')

class PredictRequest(BaseModel):
    features: list

@app.post("/predict")
def predict(request: PredictRequest):
    prediction = model.predict([request.features])
    return {"prediction": prediction.tolist()}
