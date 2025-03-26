import React from 'react'
import { IUser } from '../types'


interface Props {
    user : IUser;
    onShowFollowers : () => void;
}


const UserProfile:React.FC <Props> = ({user, onShowFollowers}) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginTop: "20px" }}>
    <img src={user.avatar_url} alt={user.username} width="80" />
    <h2>{user.name || user.username}</h2>
    <p>Bio: {user.bio || "N/A"}</p>
    <p>Location: {user.location || "N/A"}</p>
    <p>Public Repos: {user.public_repos}</p>
    <p>Followers: {user.followers} | Following: {user.following}</p>
    <button onClick={onShowFollowers}>View Followers</button>
  </div>
  )
}

export default UserProfile