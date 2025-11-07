const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock/db.json'); // chemin vers ton db.json
const middlewares = jsonServer.defaults();

// Réécriture des routes pour supporter /api/v1/customers et /api/v1/customers/:id
const rewriter = jsonServer.rewriter({
    '/api/v1/customers': '/customers',
    '/api/v1/customers/:id': '/customers/:id'
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(rewriter);
server.use(router);

server.listen(8090, () => {
    console.log('Mock server running on http://localhost:8090');
});
