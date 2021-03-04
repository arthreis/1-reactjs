import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[])

  /**
   * Adicionar um repositório a sua API:
   * Deve ser capaz de adicionar um novo item na sua API através de um botão com o texto Adicionar e
   * após a criação, deve ser capaz de exibir o nome dele após o cadastro.
   */
  async function handleAddRepository() {
    const repository = {title: `Project 1`, url: 'https://github.com/rocketseat-education', techs: ['tech1', 'tech2', 'tech3']};
    api.post('repositories', repository).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  /**
   * Remover um repositório da sua API:
   * Para cada item da sua lista, deve possuir um botão com o texto Remover que, ao clicar,
   * irá chamar uma função para remover esse item da lista do seu frontend e da sua API.
   */
  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const repos = [...repositories];
      const index = repos.findIndex(r => r.id === id)
      repos.splice(index, 1)
      setRepositories(repos)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repo) =>
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
