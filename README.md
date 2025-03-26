# GitHub User Data Management System

This project is a Full-Stack application that allows users to fetch GitHub profiles, save data to the database, search, update, and manage GitHub user information. It also enables navigation through repositories, followers, and mutual friendships.

## Features

### Backend
- User Data Storage: Accepts a GitHub username and fetches data from the GitHub API.
- Caching: Avoids duplicate API calls if user data is already stored.
- Search: Search users based on username.
- Soft Delete: Allows soft deletion of a user record.
- Sorting: Fetches all users sorted by fields such as public_repos, followers, etc.

### Frontend
- GitHub User Search: Input box to enter a GitHub username and fetch user info.

- Repository List: Displays the user's repositories with essential user information.

- Repository Details: Clicking a repository shows detailed information.

- Follower Navigation: Provides a follower list with navigation to their repository pages.

## Tech Stack

- Backend - Node.js, Express.js, TypeScript, PostgreSQL
- Frontend: React.js, TypeScript
- Database: PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/vishnuprasadvv/Github-Model-App.git
cd Github-Model-App
```

2. Install dependencies:
```bash
cd backend
npm install

cd ../frontend
npm install

```

3. Configure environment variables

DATABASE_URL="postgresql://username:yourpassword@localhost:5432/githubdb"
PORT=3000
GITHUB_API= 'https://api.github.com/users'
CLIENT_URL = 'Enter Client URL here'

4. Start backend
```bash 
cd backend
npm run dev
```

5. Start backend
```bash 
cd frontend
npm run dev
```
