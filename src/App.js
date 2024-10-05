import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [messagezperson, setMessagezPerson] = useState([]);
  const [newMessagezPerson, setNewMessagezPerson] = useState({name: "", lastname: ""});
  const [messagez, setMessagez] = useState([]);
  const [newMessagez, setNewMessagez] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/messagez/person/')
      .then(response => {
        setMessagezPerson(response.data);
      })
      .catch(error => console.error("There was an error fetching the messagez person", error));
  }, []);
  
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    if (newMessagezPerson.name.trim() !== "" && newMessagezPerson.lastname.trim() !== "") {
      axios.post('http://localhost:8000/api/messagez/person/', newMessagezPerson)
        .then(response => {
          setMessagezPerson([response.data, ...messagezperson]);
          setNewMessagezPerson({name: "", lastname: ""});
        })
        .catch(error => console.error("There was an error posting the person first and last name"));
    }
  };

  const handlePersonDelete = (id) => {
    axios.delete(`http://localhost:8000/api/messagez/person/${id}/`)
      .then(() => {
        setMessagezPerson(messagezperson.filter(person => person.id !== id));
      })
      .catch(error => console.error("There was an error deleting the person name", error));
  };

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
      <h1>User</h1>
      <form onSubmit={handlePersonSubmit}>
        <input type="text"
          value={newMessagezPerson.name}
          onChange={e => setNewMessagezPerson({ ...newMessagezPerson, name: e.target.value })}
          placeholder="First"
        />
        <input 
          type="text"
          value={newMessagezPerson.lastname}
          onChange={e => setNewMessagezPerson({ ...newMessagezPerson, lastname: e.target.value })}
          placeholder="Last name"
        />
        <button type="submit">Post your name</button>
      </form>

      <ul>
        {messagezperson.map((person) => (
          <li key={person.id}>
            {person.name} {person.lastname}
            <button onClick={() => handlePersonDelete(person.id)}>Delete</button> {/* Delete button */}
          </li>
        ))}
      </ul>

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
