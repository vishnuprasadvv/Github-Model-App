import React from 'react'
import { IRepo } from '../types'

interface Props {
    repos : IRepo[];
    onSelectRepo : (repo: IRepo) => void;
}
const RepoList:React.FC<Props> = ({ repos, onSelectRepo }) => {
  return (
    <div>
        <ul>
        {repos.map((repo) => (
          <li key={repo.id} style={{ marginBottom: "10px" }}>
            <strong>{repo.name}</strong>
            <p>{repo.description || "No description available"}</p>
            <button onClick={() => onSelectRepo(repo)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RepoList