import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  },[])

  async function handleAddRepository() {
    const repository = {
      title: "teste repositório 3",
      url: "http://test.com.br",
      techs: [
        "React",
        "React Native",
        "Node"
      ]
    }

    const response = await api.post('repositories', repository)

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const repositoriesUpdated = repositories.filter(repository => repository.id !== id)
    api.delete(`repositories/${id}`)
      .then(setRepositories(repositoriesUpdated))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <h3>{repository.title}</h3>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
