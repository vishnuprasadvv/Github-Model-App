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
        <li key={follower.id} className="follower-item">
          <img
            src={follower.avatar_url}
            alt={follower.login}
            width="50"
            className="follower-avatar"
          />
          <button
            onClick={() => onSelectUser(follower.login)}
            className="follower-btn"
          >
            {follower.login}
          </button>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default FollowersList;
