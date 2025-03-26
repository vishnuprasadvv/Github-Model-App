import axios from 'axios'
import prisma from '../models/user.model'
import { validateUsername } from '../utils/validateInput';
import { config } from '../config/config';


const GITHUB_API_URL = config.GITHUB_API;

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
}


export class UserService {
    async getUserFromGitHub(username: string) {
        if(!validateUsername(username)) throw new Error('Invalid username');

        const existingUser = await prisma.user.findUnique({
            where : {username},
            include: { repositories: true },
        });

        console.log('existing user', existingUser)
        if(existingUser) return existingUser;


        const {data} = await axios.get(`${GITHUB_API_URL}/${username}`);

        const resposResponse = await axios.get(data.repos_url);
        const repositories: GitHubRepo[] = resposResponse.data;
        console.log(repositories.length)

        console.log(data)
        const user = await prisma.user.create({
            data : {
                username : data.login,
                name : data.name,
                bio : data.bio,
                location: data.location,
                blog : data.blog,
                avatarUrl: data.avatar_url,
                publicGists: data.public_gists,
                publicRepos: data.public_repos,
                followersCount : data.followers,
                followingCount: data.following,
                followeringUrl : data.following_url,
                followersUrl : data.followers_url,
                repositories : {
                    create : repositories.map((repo) => ({
                        repoId : repo.id,
                        name: repo.name,
                        description: repo.description, 
                        url : repo.html_url,
                        language : repo.language,
                        stars : repo.stargazers_count,
                        forks: repo.forks_count,

                    }))
                }
            },
            include: { repositories : true},

        }); 
        console.log('Created user:', user);
        return user;
    }

    async deleteUser (username: string) {
        return await prisma.user.update({
            where: {username},
            data : {isDeleted : true}
        });

    }

    async updateUser(username: string, updates: Partial<Record<string, any>>) {
        return await prisma.user.update({

            where: {username},
            data: {...updates},
        });
    }

    async getAllUsersSorted(sortField: string) {
        return await prisma.user.findMany({
          orderBy: { [sortField]: 'desc' },
        });
      }
};

