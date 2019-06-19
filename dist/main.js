"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Restify = require("restify");
const server = Restify.createServer({
    name: 'meat-api',
    version: '1.0.0'
});
server.use(Restify.plugins.queryParser());
server.get('/info', (req, res, next) => {
    // res.status(404);
    // res.json({ message: 'Hello World' });
    res.json({
        browser: req.userAgent(),
        path: req.getPath(),
        method: req.method,
        url: req.getUrl(),
        query: req.query
    });
    next();
});
server.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});
