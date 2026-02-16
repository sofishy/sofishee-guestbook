import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'https://fictional-space-zebra-5g46gw9x9q4p24pj5-3000.app.github.dev/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msg) return;

    try {
      await axios.post(API_URL, { name, message: msg });
      setName("");
      setMsg("");
      fetchMessages();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📒 Guestbook</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea
          placeholder="Your Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={handleSubmit}>Sign Guestbook</button>
      </div>

      <div>
        {messages.map((m) => (
          <div key={m.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <strong>{m.name}:</strong> {m.message}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App