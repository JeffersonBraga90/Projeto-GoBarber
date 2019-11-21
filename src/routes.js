import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/students', StudentsController.store);
routes.use(AuthMiddleware);
routes.put('/students/:id', StudentsController.update);

export default routes;
