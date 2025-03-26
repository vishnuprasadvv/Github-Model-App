import dotenv from 'dotenv';

dotenv.config();

export const config = {
    DATABASE_URL : process.env.DATABASE_URL,
    PORT : process.env.PORT,
    GITHUB_API : process.env.GITHUB_API,
    CLIENT_URL : process.env.CLIENT_URL,
}