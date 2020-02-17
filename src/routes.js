import { resolve } from 'path';
import { Router } from 'express';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ToolController from './app/controllers/ToolController';

// Validators
import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';
import validateToolStore from './app/validators/ToolStore';

const swaggerDocument = YAML.load(resolve(__dirname, 'swagger.yaml'));

const routes = new Router();

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.get('/', (req, res) =>
  res.json({
    name: 'Api Tool Repository Manager',
    version: '1.0.0',
    mode: process.env.NODE_ENV,
  })
);

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', validateUserStore, UserController.store);

routes.use(authMiddleware);
routes.get('/tools', ToolController.index);
routes.get('/tools/search', ToolController.search);
routes.post('/tools', validateToolStore, ToolController.store);
routes.delete('/tools/:id', ToolController.destroy);

export default routes;
