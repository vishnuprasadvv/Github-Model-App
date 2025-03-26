export interface IUser {
    id: number;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  publicRepos: number;
  publicGists : number;
  followersCount: number;
  followingCount: number;
  repositories : IRepo[];
  followersUrl : string;
  followingUrl : string;
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
    login: string;
    avatar_url: string;
  }