import * as restify from 'restify';
import * as mongoose from 'mongoose';
import { env } from '../common/environment';
import { Router } from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';

const { PORT } = env.server;

export class Server {
  application: restify.Server;

  initDB(): Promise<any> {
    return mongoose.connect(env.DB.url, {
      useNewUrlParser: true
    });
  }

  initRoutes(routes): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: 'meat-api',
          version: '1.0.0'
        });

        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);

        // Routes
        for (const route of routes) {
          route.applyRoutes(this.application);
        }

        this.application.listen(PORT, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async bootstrap(routes: Router[] = []): Promise<Server> {
    await this.initDB();
    await this.initRoutes(routes);
    return this;
  }
}
