
import { useState } from 'react'
import './App.css';
import axios from 'axios';
import { IFollower, IRepo, IUser } from './types';
import RepoList from './components/RepoList';
import UserProfile from './components/UserProfile';

const API_URL = "http://localhost:3000/api/users";

type ViewType = "search" | "repos" | "repoDetail" | "followers";

function App() {
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [followers, setFollowers] = useState<IFollower[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<IRepo | null>(null);
  const [view, setView] = useState<ViewType>("search");

  const handleSearch = async () => {
    if(!username) return alert('Please enter a username');

    try {
      const userResponse = await axios.get<IUser & { repos: IRepo[] }>(`${API_URL}/${username}`);
      setUserData(userResponse.data);
      setRepos(userResponse.data.repos);
      setView("repos");
    } catch (error) {
      alert("Error fetching user data");
      console.error(error);
    }
  }

  const handleShowFollowers = async () => {
    try {
      const response = await axios.get<IFollower[]>(`${API_URL}/${username}/followers`);
      setFollowers(response.data);
      setView("followers");
    } catch (error) {
      alert("Error fetching followers");
    }
  };

  const handleSelectFollower = (followerUsername: string) => {
    setUsername(followerUsername);
    handleSearch();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>GitHub Search App</h1>

      <input
        type="text"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {userData && (
        <UserProfile user={userData} onShowFollowers={handleShowFollowers} />
      )}

      {view === "repos" && (
        <RepoList repos={repos} onSelectRepo={setSelectedRepo} />
      )}
    </div>
  )
}

export default App
