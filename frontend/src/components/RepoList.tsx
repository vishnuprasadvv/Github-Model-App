import React from 'react'
import { IRepo } from '../types'
import verified from '../assets/icons8-verify-90.png'
import repoIcon from '../assets/icons8-git-250.png'

interface Props {
    repos : IRepo[];
    onSelectRepo : (repo: IRepo) => void;
}
const RepoList:React.FC<Props> = ({ repos = [], onSelectRepo }) => {
  return (
    <div>
      {
        repos.length > 0 ? (
          <div  className="repo-grid">
          {repos.map((repo) => (
            <div key={repo.id} onClick={() => onSelectRepo(repo)} className="repo-item" >
              <img src={repoIcon} alt={repo.name} className="repo-logo" />
              <div className="repo-content">
                <h3 className="repo-name">
                  {repo.name} <span className="verified"><img src={verified} width={20} height={20} /></span>
                </h3>
                <p className="repo-description">{repo.description}</p>
              </div>
            </div>
          ))}
          </div>
        ) : (

          <div className="empty-repo-div">
            <h2>No Repositories</h2>
          </div>
        )
      }
      
    </div>
  )
}

export default RepoList