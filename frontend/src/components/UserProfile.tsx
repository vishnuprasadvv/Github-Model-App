import React from 'react'
import { IUser } from '../types'


interface Props {
    user : IUser;
    onShowFollowers : () => void;
}


const UserProfile:React.FC <Props> = ({user, onShowFollowers}) => {
  return (
    <div className="user-profile">
    <img className="avatar" src={user.avatarUrl} alt={user.username} />
    <div className="user-info">
      <h2>{user.name || user.username}</h2>
      <p className="bio">{user.bio || "No bio available"}</p>
      <p className="location">📍 {user.location || "Unknown Location"}</p>
      <div className="stats">
        <span>🗂️ {user.publicRepos} Repos</span>
        <span>👥 {user.followersCount} Followers</span>
        <span>🔗 {user.followingCount} Following</span>
      </div>
      <button className="btn-followers" onClick={onShowFollowers}>
        View Followers
      </button>
    </div>
  </div>
  )
}

export default UserProfile