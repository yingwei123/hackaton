const fs = require('fs');
const path = require('path');
const restify = require('restify');
const server = restify.createServer();

server.use(restify.plugins.bodyParser());

require('./routes/user')(server);


module.exports = server;
