import { Server } from './server/Server';
import { usersRouter } from './users/users.router';

const server = new Server();
server
  .bootstrap([usersRouter])
  .then(server => {
    console.log('Server is running on: ', server.application.address());
  })
  .catch(err => {
    console.log('Server failed to start');
    console.log(err);
    process.exit(1);
  });
