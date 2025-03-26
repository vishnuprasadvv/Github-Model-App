
import { useState } from 'react'
import './App.css';
import axios from 'axios';
import { IFollower, IRepo, IUser } from './types';
import RepoList from './components/RepoList';
import UserProfile from './components/UserProfile';
import FollowersList from './components/FollowersList';
import RepoDetail from './components/RepoDetails';

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
      console.log(userResponse.data)
      setUserData(userResponse.data);
      setRepos(userResponse.data.repositories);
      setView("repos");
    } catch (error) {
      alert("Error fetching user data");
      console.error(error);
    }
  }

  const handleShowFollowers = async () => {
    try {
      const response = await axios.get<IFollower[]>(`${userData?.followersUrl}`);
      console.log(response)
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

  const handleSelectRepo = (repo:IRepo) =>{
    setSelectedRepo(repo);
    setView('repoDetail');
  }

  return (
    <div className='main'>
      <div className="github-search-container">
      <h1 className="title">🔍 GitHub Search App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button onClick={handleSearch} className="btn-search">
          Search
        </button>
      </div>
    </div>

      {userData && (
        <UserProfile user={userData} onShowFollowers={handleShowFollowers} />
      )}

      {view === "repos" && (
        <RepoList repos={repos} onSelectRepo={handleSelectRepo} />
      )}

{view === "repoDetail" && selectedRepo && (
        <RepoDetail repo={selectedRepo} onBack={() => setView("repos")} />
      )}

       {view === "followers" && (
        <FollowersList
          followers={followers}
          onSelectUser={handleSelectFollower}
        />
      )}

      {view !== "search" && (
        <button onClick={() => setView("repos")}>Back to Repos</button>
      )}
    
    </div>
  )
}

export default App
