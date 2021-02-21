const router = require('express').Router();
const { RenderFile, Errors } = require('./utilities');

const Errs = new Errors();

let dir = __dirname.replace('utilities', 'public/views/')

const Routes = io => {
	io.on('connection', async socket => {
		socket.on('loginCredentials', data => {
			if (!data) socket.emit('loginError', Errs.unexpectedError())
			
			if (!data.email || !data.password) socket.emit('loginError', Errs.missingCredentials());
		});
	});
	
	router.get("/", (_, res) => {
		RenderFile(res, "index");
	});
	
	router.get('/create', (_, res) => {
		RenderFile(res, 'signup');
	});
	
	return router;
}

module.exports = Routes;