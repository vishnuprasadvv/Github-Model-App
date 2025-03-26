import express from 'express';
import { config } from './config/config';
import userRouter from './routes/user.routes';
import cors from 'cors';

const PORT = config.PORT;


const app = express();


app.use(cors({
    origin: config.CLIENT_URL,
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'PATCH' ],
    credentials : true,
}))

app.use(express());
app.use('/api/users', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});