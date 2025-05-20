import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an audio file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch("http://localhost:5000/transcribe", {
      const response = await fetch("https://autospeech2text-backend.onrender.com/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.transcription) {
        setTranscription(data.transcription);
      } else {
        setTranscription("Error: " + data.error);
      }
    } catch (err) {
      setTranscription("Upload failed: " + err.message);
    }
  };

  return (
    <div className="App">
      <h1>AutoSpeech2Text 🎙️</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Transcribe</button>
      <h2>Transcription Output:</h2>
      <p>{transcription}</p>
    </div>
  );
}

export default App;
