import * as restify from 'restify';
import { Router } from '../common/router';
import { User } from '../users/users.model';

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    // Application é o restify
    application.get('/users', async (req, res, next) => {
      const user = await User.findAll();
      res.json(200, user);
      return next();
    });

    application.get('/users/:id', async (req, res, next) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(200, user);
        return next();
      } else {
        res.json(404);
        return next();
      }
    });
  }
}

export const usersRouter = new UsersRouter();
