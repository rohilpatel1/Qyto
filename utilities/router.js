const router = require('express').Router();
const { RenderFile } = require('./utilities');

let dir = __dirname.replace('utilities', 'public/views/')

const Routes = io => {
	io.on('connection', async socket => {
		console.log("User connected");
	});
	
	router.get("/", (_, res) => {
		RenderFile(res, "index");
	});
	
	return router;
}

module.exports = Routes;