const express = require('express');
const ejs = require('ejs');

const app = express();
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

const Routes = require('./utilities/router');

app.use(Routes(io));
app.use(express.static('public'));

server.listen(3000, _ => console.log('SERVER STARTED ON PORT 3000'));
