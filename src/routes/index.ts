import { Router } from 'express';
import Tower from '../controllers/Tower';
import User from '../controllers/User';
import { verifyToken } from '../utils/verifyToken';

const exportedRoute = () => {
  const route = Router();
  const tower = new Tower();
  const user = new User();

  // User route
  route.post('/user/register', user.register);
  route.post('/user/login', user.login);

  // Tower route
  route.get('/tower', verifyToken, tower.getAll);
  route.get('/tower/:id', verifyToken, tower.get);
  route.get('/towerSearch/', verifyToken, tower.search);
  route.post('/tower', verifyToken, tower.save);
  route.put('/tower/:id', verifyToken, tower.update);
  route.delete('/tower/:id', verifyToken, tower.delete);
  return route;
};

export default exportedRoute;
