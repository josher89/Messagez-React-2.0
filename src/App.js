import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [messagez, setMessagez] = useState([]);
  const [newMessagez, setNewMessagez] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/messagez/')
      .then(response => {
        setMessagez(response.data);
      })
      .catch(error => console.error("There was an error fetching the messagez", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessagez.trim() !== "") {
      axios.post('http://localhost:8000/api/messagez/', { text: newMessagez })
        .then(response => {
          setMessagez([response.data, ...messagez]);
          setNewMessagez("");
        })
        .catch(error => console.error("There was an error posting the messagez", error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/messagez/${id}/`)
      .then(() => {
        setMessagez(messagez.filter(message => message.id !== id));
      })
      .catch(error => console.error("There was an error deleting the message", error));
  };

  return (
    <div>
      <h1>Messagez</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessagez}
          onChange={e => setNewMessagez(e.target.value)}
          placeholder="Write a messagez"
        />
        <button type="submit">Send messagez</button>
      </form>

      <ul>
        {messagez.map((messagez) => (
          <li key={messagez.id}>
            {messagez.text} - {new Date(messagez.timestamp).toLocaleString()}
            <button onClick={() => handleDelete(messagez.id)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
