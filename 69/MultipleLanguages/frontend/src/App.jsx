import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [echo, setEcho] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setEcho(data.received.input);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Python + React</h1>
      <p>Message from backend: {message}</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={handleSubmit}>Send to backend</button>
      <p>Backend echoed: {echo}</p>
    </div>
  );
}

export default App;
