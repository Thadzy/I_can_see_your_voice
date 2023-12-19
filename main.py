import librosa
import numpy as np
import joblib
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
import os
import tempfile

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Function to extract features
def extract_features(y, sr):
    # Your existing feature extraction logic
    features = {
        'chroma_stft': np.mean(librosa.feature.chroma_stft(y=y, sr=sr)),
        'rms': np.mean(librosa.feature.rms(y=y)),
        'spectral_centroid': np.mean(librosa.feature.spectral_centroid(y=y, sr=sr)),
        'spectral_bandwidth': np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr)),
        'rolloff': np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr)),
        'zero_crossing_rate': np.mean(librosa.feature.zero_crossing_rate(y))
    }

    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=20)

    for i, mfcc in enumerate(mfccs):
        features[f'mfcc{i+1}'] = np.mean(mfcc)

    return features

# Load your pre-trained model
model_path = 'random_forest.joblib'
if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    raise FileNotFoundError(f"Model file not found: {model_path}")

@app.post("/predict")
async def predict_audio(file: UploadFile = File(...)):
    # Use a temporary file to save the uploaded file
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    # Load the audio file
    y, sr = librosa.load(temp_file_path, sr=None)

    # Extract features
    features = extract_features(y, sr)

    # Convert features to list for prediction
    features_list = list(features.values())

    # Make a prediction
    pred_values = model.predict([features_list])
    return {"Predicted values": pred_values.tolist()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
