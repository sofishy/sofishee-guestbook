import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Use your actual Codespaces backend URL
const API_URL = 'https://fictional-space-zebra-5g46gw9x9q4p24pj5-3000.app.github.dev/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages when component loads
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📡 Fetching messages from:', API_URL);
      const res = await axios.get(API_URL);
      console.log('✅ Messages received:', res.data);
      setMessages(res.data || []);
    } catch (error) {
      console.error('❌ Error fetching messages:', error);
      setError('Failed to load messages. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !msg) {
      alert("Please fill in both fields");
      return;
    }

    try {
      console.log('📤 Posting message:', { name, message: msg });
      const res = await axios.post(API_URL, { name, message: msg });
      console.log('✅ Message posted:', res.data);
      
      // Clear form
      setName("");
      setMsg("");
      
      // Refresh the list
      fetchMessages();
    } catch (error) {
      console.error('❌ Error posting message:', error);
      alert('Failed to post message. Check console for details.');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
        📒 Guestbook
      </h1>
      
      {/* Input Form */}
      <div style={{ 
        background: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginTop: 0, color: '#555' }}>Leave a message</h3>
        
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ 
            display: 'block', 
            width: '100%', 
            marginBottom: '10px', 
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
        
        <textarea
          placeholder="Your Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{ 
            display: 'block', 
            width: '100%', 
            marginBottom: '10px', 
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minHeight: '100px',
            boxSizing: 'border-box'
          }}
        />
        
        <button 
          onClick={handleSubmit}
          style={{ 
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sign Guestbook
        </button>
      </div>

      {/* Messages List */}
      <div>
        <h3 style={{ color: '#555', marginBottom: '15px' }}>
          Messages ({messages.length})
        </h3>
        
        {loading && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>Loading messages...</p>
        )}
        
        {error && (
          <div style={{ 
            padding: '10px', 
            background: '#f8d7da', 
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            ❌ {error}
          </div>
        )}
        
        {!loading && !error && messages.length === 0 && (
          <p style={{ color: '#666', fontStyle: 'italic' }}>
            No messages yet. Be the first to sign!
          </p>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id} 
            style={{ 
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <strong style={{ color: '#007bff', fontSize: '1.1em' }}>
                {message.name}
              </strong>
              <span style={{ fontSize: '0.8em', color: '#999' }}>
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <p style={{ margin: 0, color: '#333', lineHeight: '1.5' }}>
              {message.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App