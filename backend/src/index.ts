const cors = require('cors');
import { IncidentController } from './controllers/incident.controller';
import { UserController } from './controllers/user.controller';
import { getDatabaseConnection } from './database';
import { IncidentEntity } from './entities/incident.entity';
import { UserEntity } from './entities/user.entity';

require('dotenv').config();
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

const createApp = async () => {
  const db = await getDatabaseConnection();

  const userRepository = db.getMongoRepository(UserEntity);
  const userController = new UserController(userRepository);

  const incidentRepository = db.getMongoRepository(IncidentEntity);
  const incidentController = new IncidentController(incidentRepository);

  app.get('/', (req, res) => {
    res.send('<h1>Desenvolimento Web</h1>');
  });

  app.use(userController.getRoutes());
  app.use(incidentController.getRoutes());

  app.listen(process.env.PORT, () => {
    console.log(`listening on -> ${ process.env.PORT }`);
  });
};

createApp();
