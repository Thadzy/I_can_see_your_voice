import React from 'react';

function HeroSection() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh', // Adjust as needed
            backgroundImage: 'url("your-background-image-url.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '20px',
        }}>
            <h1 style={{ fontSize: '3em', fontWeight: 'bold' }}>Welcome to I can see your voice!</h1>
            <p style={{ fontSize: '1.5em', margin: '20px 0' }}>
                You look lonely I can fix that.
            </p>
            <button style={{
                padding: '10px 20px',
                fontSize: '1em',
                color: '#fff',
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
            }}>
                Get Started
            </button>
        </div>
    );
}

export default HeroSection;
