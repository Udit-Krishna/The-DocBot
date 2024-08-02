import React from 'react'
import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
function Diagnosis() {
    const handleSubmit = async ()=>{
        const response = await api.post("/chat-bot", content);
    }
  return (
    <>
      <div>Diagnosis</div>
      <input type="file" id="file-selector" accept=".jpg, .jpeg, .png"></input><br></br>
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

export default Diagnosis