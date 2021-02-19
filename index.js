const express = require('express');
const ejs = require('ejs');

//SERVER
const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

//CUSTOM MODULES
const Routes = require('./utilities/router');

//MIDDLEWARE
app.use(Routes(io));
app.use(express.static('public'));

//console.clear();

server.listen(3000, _ => console.log('SERVER STARTED ON PORT 3000'));
