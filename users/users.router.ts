import * as restify from 'restify';
import { Router } from '../common/router';
import { User } from '../users/users.model';

class UsersRouter extends Router {
  applyRoutes(application: restify.Server) {
    // Application é o restify
    application.get('/users', async (req, res, next) => {
      const user = await User.find();
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

    application.post('/users', async (req, res, next) => {
      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
        res.json(409, { message: 'Email já está em uso' });
        return next();
      }
      const Model = new User(req.body);
      const user = await Model.save();
      user.password = undefined;
      res.json(201, user);
      return next();
    });

    application.put('/users/:id', async (req, res, next) => {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.json(404, { message: 'Usuário não encontrado' });
        return next();
      }
      let updated = await User.updateOne(
        { _id: req.params.id },
        req.body
      ).exec();
      updated = await User.findById(req.params.id);
      res.json(200, updated);
      return next();
    });

    application.patch('/users/:id', async (req, res, next) => {
      const opt = { new: true };
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body
        },
        opt
      );
      if (user) {
        res.json(200, user);
        return next();
      } else {
        res.send(404);
        return next();
      }
    });

    application.del('/users/:id', async (req, res, next) => {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.send(204);
        return next();
      } else {
        res.send(404);
        return next();
      }
    });
  }
}

export const usersRouter = new UsersRouter();
