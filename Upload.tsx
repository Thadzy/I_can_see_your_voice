'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';

const HeroUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/predict', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                // Check the prediction value and set the display text
                const predictionValue = data["Predicted values"] ? data["Predicted values"][0] : null;
                if (predictionValue === 1) {
                    setPrediction('Real');
                } else if (predictionValue === 0) {
                    setPrediction('Fake');
                } else {
                    setPrediction('Unknown Prediction');
                }
            } else {
                console.error('Error uploading file:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'url("https://media.discordapp.net/attachments/821655672536956942/1185598972321079346/bf9f9dbd0e0c8564.png?ex=65903216&is=657dbd16&hm=8a73ff939d0291b9e44df5c951db93b366b4a7a0e2a09134366b5747f8ae954a&=&format=webp&quality=lossless&width=796&height=447")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#080808',
        }}>
            <h1 style={{ fontSize: '3em', fontWeight: 'bold', color: 'white' }}>Welcome to I can see your voice</h1>
            <p style={{ fontSize: '1.5em', margin: '20px 0', color: 'white' }}>
                you look lonely I can see your voice is real or fake.
            </p>

            <form onSubmit={handleFormSubmit} style={{
                backgroundColor: '#111827',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '400px',
                width: '100%',
                color: 'white',
            }}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px' }} htmlFor="file-upload">Upload File</label>
                    <input
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>
                <button style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    width: '100%',
                }} type="submit">
                    Upload
                </button>
                {prediction && (
                    <div style={{ marginTop: '20px', color: 'white' }}>Prediction: {prediction}</div>
                )}
            </form>
        </div>
    );
}

export default HeroUpload;
