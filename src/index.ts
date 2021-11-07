import express from 'express';
import { userRouter } from './routers/user';
import { DB_NAME, DB_PASSWORD, DB_USER_NAME, PORT, ROUTERS_NAMES, SEQUELIZE_CONFIG } from './configure/configure.constants';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(DB_NAME, DB_USER_NAME, DB_PASSWORD, SEQUELIZE_CONFIG);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_req, res) => {
    res.status(400).send({ message: 'This type of request is not handle' });
});

app.use(ROUTERS_NAMES.users, userRouter);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server start on port: ${PORT}`);
    });
}).catch(err => console.log(err));

