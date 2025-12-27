import { useState } from 'react'
import type { KeyboardEvent, ChangeEvent } from 'react'
import './App.css'

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = (): void => {
    if (!input.trim()) return;
    
    const newUserMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    
    setTimeout(() => {
      const botResponse: Message = { text: `From Bot!: ${input}`, sender: "bot" };
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div className="app-container">
      <header>Chat Assistant</header>
      <div id="chat">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <footer>
        <input 
          value={input} 
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..." 
        />
        <button onClick={sendMessage}>Send</button>
      </footer>
    </div>
  );
}

export default App;