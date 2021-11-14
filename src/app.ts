import express from 'express';
import { PORT  } from './configure/configure.constants';
import { sequelize } from './models/index';
import { init } from './loaders';


const startServer = async () => {
    const app = express();

    await init({ expressApp: app });

    await sequelize.sync({ alter: true });

    await app.listen(PORT, () => {
        console.log('Server is running on port: ', PORT);
    });
};

startServer();
