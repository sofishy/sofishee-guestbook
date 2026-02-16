import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

// Your backend URL
const API_URL = 'https://fictional-space-zebra-5g46gw9x9q4p24pj5-3000.app.github.dev/guestbook';

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages on load
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('📡 Fetching from:', API_URL);
      const response = await axios.get(API_URL);
      console.log('✅ Received:', response.data);
      setMessages(response.data || []);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Failed to load messages. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      console.log('📤 Sending:', { name, message });
      const response = await axios.post(API_URL, { 
        name: name.trim(), 
        message: message.trim() 
      });
      console.log('✅ Sent:', response.data);
      
      // Clear form
      setName('');
      setMessage('');
      
      // Refresh messages
      fetchMessages();
    } catch (err) {
      console.error('❌ Error sending:', err);
      alert('Failed to send message. Check console for details.');
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📒 Guestbook</h1>
      </header>

      <main className="main">
        {/* Form Section */}
        <section className="form-section">
          <h2>Leave a message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea-field"
              rows="4"
            />
            <button type="submit" className="submit-btn">
              Sign Guestbook
            </button>
          </form>
        </section>

        {/* Messages Section */}
        <section className="messages-section">
          <h2>Messages ({messages.length})</h2>
          
          {loading && <p className="loading">Loading messages...</p>}
          
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
          
          {!loading && !error && messages.length === 0 && (
            <p className="no-messages">No messages yet. Be the first to sign!</p>
          )}
          
          <div className="messages-list">
            {messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <strong className="message-name">{msg.name}</strong>
                  <span className="message-date">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="message-text">{msg.message}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;