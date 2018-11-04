const http = require('http');
const app = require('./app');

//Server Port
const port = process.env.SERVER_PORT || 3000;

const server = http.createServer(app);

server.listen(port);