
import { useState } from 'react'
import './App.css';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/users";

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [view, setView] = useState("search"); 

  const handleSearch = async () => {
    if(!username) return alert('Please enter a username');

    try {
      const userResponse = await axios.get(`${API_URL}/${username}`);
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
      const response = await axios.get(`${API_URL}/${username}/followers`);
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

   
    </div>
  )
}

export default App
