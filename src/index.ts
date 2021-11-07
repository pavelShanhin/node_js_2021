import express from 'express';
import { userRouter } from './routers/user';
import { ROUTERS_NAMES, PORT } from './configure/configure.constants';
import { sequelize } from './models/index';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.status(400).send({ message: 'This type of request is not handle' });
});

app.use(ROUTERS_NAMES.users, userRouter);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server start on port: ${PORT}`);
    });
}).catch(err => console.log(err));

