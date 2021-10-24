import express from 'express';
import {userRouter} from './routers/user'

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello user');
});

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
