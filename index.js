const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);

// CORS middleware (keep this)
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Custom Middleware for Userdata creation
server.use((req, res, next) => {
    if (req.method === 'POST' && req.url.startsWith('/userdata/') && req.url.endsWith('/todos')) {
        const userEmail = req.url.split('/')[2];
        const db = router.db;

        const userData = db.get('userdata').find({ email: userEmail }).value();

        if (!userData) {
            db.get('userdata').push({ email: userEmail }).write();
            req.body.userEmail = userEmail;  // Add userEmail to todo data
        } else {
            req.body.userEmail = userEmail; // Add userEmail to todo data
        }
    }
    next();
});


server.use(router); // Important: Place this AFTER the middleware
server.listen(port);