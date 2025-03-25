import express from 'express';
import { config } from './config/config';
import userRouter from './routes/user.routes';

const PORT = config.PORT;


const app = express();

app.use(express());
app.use('/api/users', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});