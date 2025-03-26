import React from "react";
import { IFollower } from "../types";

interface Props {
  followers: IFollower[];
  onSelectUser: (username: string) => void;
}

const FollowersList: React.FC<Props> = ({ followers, onSelectUser }) => {
  return (
    <div className="followers-container">
    <h3 className="followers-title">Followers</h3>
    <ul className="followers-list">
      {followers.map((follower) => (
        <li key={follower.id} >
          <div className="follower-item"
           onClick={() => onSelectUser(follower.login)}>
          <img
            src={follower.avatar_url}
            alt={follower.login}
            width="50"
            className="follower-avatar"
          />
          <span className="follower-name">{follower.login}</span>
          
          </div>
          
        </li>
      ))}
    </ul>
  </div>
  );
};

export default FollowersList;
