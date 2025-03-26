import React, { useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../types";

const API_URL = "http://localhost:3000/api/users";

interface Props {
  onSelectUser: (username: string) => void;
}

const UserList: React.FC<Props> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [sortField, setSortField] = useState<string>("username");
  const [order, setOrder] = useState<string>("asc");

  const fetchUsers = async () => {
    try {
      const response = await axios.get<IUser[]>(
        `${API_URL}?sortBy=${sortField}&order=${order}`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Error loading users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sortField, order]);

  const handleSortChange = (field: string) => {
    setSortField(field);
    setOrder("desc");
  };

  return (
    <div className={"container"}>
      <h2 className={"title"}>All Users</h2>

      {/* Sorting Controls */}
      <div className={"sortControls"}>
        <label className={"label"}>Sort by:</label>
        <select
          className={"select"}
          value={sortField}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="followersCount">Followers</option>
          <option value="followingCount">Following</option>
          <option value="publicRepos">Repositories</option>
          <option value="publicGists">Gists</option>
          <option value="createdAt">Created At</option>
        </select>
      </div>

      {/* User List */}
      {users.length === 0 ? (
        <p className={"noUsers"}>No users available.</p>
      ) : (
        <ul className={"userList"}>
          {users.map((user) => (
            <li key={user.id} className={"userCard"}>
              <img
                src={user.avatarUrl}
                alt={user.username}
                className={"avatar"}
              />
              <button
                onClick={() => onSelectUser(user.username)}
                className={"username"}
              >
                {user.username}
              </button>
              <div className={"details"}>
                <p>Followers: {user.followersCount}</p>
                <p>Following: {user.followingCount}</p>
                <p>Repos: {user.publicRepos}</p>
                <p>Gists: {user.publicGists}</p>
              </div>
              <button
                onClick={() => onSelectUser(user.username)}
                className={"view-profile-button"}
              >
                View Profile
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
