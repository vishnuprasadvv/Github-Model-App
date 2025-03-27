import "./App.css";
import axios from "axios";
import { IFollower, IRepo, IUser } from "./types";
import RepoList from "./components/RepoList";
import UserProfile from "./components/UserProfile";
import FollowersList from "./components/FollowersList";
import RepoDetail from "./components/RepoDetails";
import { useState } from "react";
import UserList from "./components/UserList";

const BACKEND_API = import.meta.env.VITE_SERVER_URL;

const API_URL = `${BACKEND_API}/api/users`;

type ViewType = "search" | "repos" | "repoDetail" | "followers" | "userList";

function App() {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [followers, setFollowers] = useState<IFollower[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<IRepo | null>(null);
  const [view, setView] = useState<ViewType>("userList");
  const [loading, setLoading] = useState(false);

  //search function
  const handleSearch = async (targetUsername: string = username) => {
    if (!targetUsername) return alert("Please enter a username");
    setLoading(true);

    setView("search");
    setUserData(null);
    setRepos([]);
    setFollowers([]);

    try {
      const userResponse = await axios.get<IUser & { repos: IRepo[] }>(
        `${API_URL}/${targetUsername}`
      );

      setUserData(userResponse.data);
      setRepos(userResponse.data.repositories);
      setView("repos");
    } catch (error) {
      alert("Error fetching user data");
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  const handleShowFollowers = async () => {
    try {
      const response = await axios.get<IFollower[]>(
        `${userData?.followersUrl}`
      );
      setFollowers(response.data);
      setView("followers");
    } catch (error) {
      alert("Error fetching followers");
    }
  };

  const handleSelectFollower = (followerUsername: string) => {
    setUsername(followerUsername);
    handleSearch(followerUsername);
  };

  const handleSelectRepo = (repo: IRepo) => {
    setSelectedRepo(repo);
    setView("repoDetail");
  };

  const handleGoToHome = () => {
    setView('userList');
    setUsername('');
  }

  return (
    <div className="main">
      <div className="github-search-container">
        <h1 className="main-title" onClick={handleGoToHome}>
          🔍 GitHub Search App
        </h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button onClick={() => handleSearch()} className="btn-search">
            Search
          </button>
        </div>
      </div>

    {loading ? (
      <div className="loading-div">
        <h2>Loading...</h2>
      </div>
    ) : (
      <div>

        { username.length !== 0 && userData === null && (
           <div className="no-results-div">
           <h2>No Results.</h2>
           <button 
           onClick={handleGoToHome}
           className="go-home-btn">Go to home</button>
         </div>
        )}
        
 {userData && view !== "userList" && view !== "repoDetail" && (
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

      {view === "userList" && <UserList onSelectUser={handleSearch} />}
      </div>
    )}
     
    </div>
  );
}

export default App;
