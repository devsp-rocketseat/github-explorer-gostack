import { FormEvent, useState } from 'react'
import api from '../../services/api'

import { FiChevronRight } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'

import { Title, Form, Repositories } from './styles'

interface Repository {
    full_name: string
    description: string
    owner: {
        login: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('vitordevsp/casa-criativa')
    const [repositories, setRepositories] = useState<Repository[]>([])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()

        const response = await api.get<Repository>(`repos/${newRepo}`)

        const repository = response.data

        setRepositories([...repositories, repository])

        setNewRepo('')
    }

    return (
        <>
            <img src={logoImg} alt="GitHub Explorer" />
            <Title>Explore repositórios no GitHub</Title>

            <Form onSubmit={handleAddRepository}>
                <input value={newRepo} onChange={e => setNewRepo(e.target.value)} placeholder="Digite o nome do repositório" />
                <button type="submit">Pesquisar</button>
            </Form>

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
