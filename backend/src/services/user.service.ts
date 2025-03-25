import axios from 'axios'
import prisma from '../models/user.model'
import { validateUsername } from '../utils/validateInput';
import { config } from '../config/config';


const GITHUB_API_URL = config.GITHUB_API;

export class UserService {
    async getUserFromGitHub(username: string) {
        if(!validateUsername(username)) throw new Error('Invalid username');

        const existingUser = await prisma.user.findUnique({where : {username}});

        console.log('existing user', existingUser)
        if(existingUser) return existingUser;


        const {data} = await axios.get(`${GITHUB_API_URL}/${username}`);

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
            }
        });
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
};

