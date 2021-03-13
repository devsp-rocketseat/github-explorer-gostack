import { useState, useEffect, FormEvent } from 'react'
import api from '../../services/api'

import { FiChevronRight } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories, Error } from './styles'

interface Repository {
    full_name: string
    description: string
    owner: {
        login: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepos = localStorage.getItem('repositories')

        if (storagedRepos) return JSON.parse(storagedRepos)

        return []
    })

    useEffect(() => {
        localStorage.setItem('repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()

        if (!newRepo) return setInputError('Digite o autor/nome do repositório')

        try {
            const response = await api.get<Repository>(`repos/${newRepo}`)

            const repository = response.data

            setRepositories([...repositories, repository])

            setNewRepo('')
            setInputError('')
        } catch (error) {
            setInputError('Erro ao buscar esse repositório')
        }
    }

    return (
        <>
            <img src={logoImg} alt="GitHub Explorer" />
            <Title>Explore repositórios no GitHub</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repo => (
                    <a key={repo.full_name} href="teste">
                        <img src={repo.owner.avatar_url} alt={repo.owner.login} />

                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Repositories>
        </>
    )
}

export default Dashboard
