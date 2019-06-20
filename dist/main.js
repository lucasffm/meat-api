"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./server/Server");
const users_router_1 = require("./users/users.router");
const server = new Server_1.Server();
server
    .bootstrap([users_router_1.usersRouter])
    .then(server => {
    console.log('Server is running on: ', server.application.address());
})
    .catch(err => {
    console.log('Server failed to start');
    console.log(err);
    process.exit(1);
});
