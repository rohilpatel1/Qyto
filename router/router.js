const router = require('express').Router();

const Routes(io) {
	io.on('connection', socket => {
		console.log("User connected");
		
		router.get("/", (_, res) => {
			RenderFile(res, index)
		});
	});
	
}