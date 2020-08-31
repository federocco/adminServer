import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();
import { config } from 'node-config-ts';

const {
  server: { port },
} = config;

// Database models
import { getDatabase } from './database';

// Controllers
import { get404 } from './controller/error';
import userRoutes from './routes/user';
import driverRoutes from './routes/driver';

const app = express();
app.use(bodyParser({ extended: false }));
app.use(cors());

// here is how you can get your database reference
getDatabase()
  .then(async () => {
    app.use('/users', userRoutes);
    app.use('/drivers', driverRoutes);

    app.get('/', (req, res) => {
      res.send(`Hello World on port ${port}`);
    });

    app.use(get404);

    app.listen(port, () => {
      console.log(`Server is running in http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Server app error: ', error);
  });
