import express from 'express';
import { PORT,  } from './configure/configure.constants';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.status(400).send({ message: 'This type of request is not handle' });
});

app.listen(PORT, () => {
    console.log(`Server start on port: ${PORT}`);
});
