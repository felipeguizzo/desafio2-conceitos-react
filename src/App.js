
import React, { useState, useEffect } from 'react';
import api from './services/api'

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/felipeguizzo/desafio2-conceitos-node",
      title: `Reacj Project`,
      techs: ["Node", "Express"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`);
    
    const repositoryIndex = repositories.findIndex(repository => repository.id == id);

    repositories.splice(repositoryIndex, 1);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
      </ul>
      <button onClick={() => handleRemoveRepository(123)}>
            Remover
      </button>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
