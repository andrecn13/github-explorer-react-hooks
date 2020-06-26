import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './style';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const StoragedRepositories = localStorage.getItem(
      '@GithubExplorer:respositories',
    );

    if (StoragedRepositories) return JSON.parse(StoragedRepositories);

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:respositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (inputError.length > 0) {
      setInputError('');
    }

    if (!newRepo) {
      setInputError('Digite o autor/repositorio!!');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.get<Repository>(`repos/${newRepo}`);

      const findRepo = repositories.findIndex(
        (repository) => repository.full_name === newRepo,
      );

      if (findRepo === -1) {
        setRepositories([...repositories, data]);
        setNewRepo('');
      } else {
        setInputError('Repositorio já existe!!');
      }
    } catch (error) {
      setInputError('Erro ao buscar repositório, tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <img src={logoImg} alt="Logo" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleFormSubmit}>
        <input
          placeholder="Digite o nome do usuário/repositorio"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit"> {!loading ? 'Buscar' : 'Buscando...'} </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={22} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
