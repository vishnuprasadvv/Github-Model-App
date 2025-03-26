export interface IUser {
    id: number;
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface IRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
  }

  export interface IFollower {
    id: number;
    username: string;
    avatar_url: string;
  }