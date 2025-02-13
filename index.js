const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
server.listen(port);