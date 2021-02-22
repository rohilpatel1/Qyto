const router = require('express').Router();
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

const { RenderFile } = require('./utilities');
const Err = require('./Errors');

const Error = new Err();
const db = admin.firestore();

let dir = __dirname.replace('utilities', 'public/views/')

const users = db.collection('users');

const Routes = io => {
	io.on('connection', async socket => {
		socket.on('loginCredentials', data => {
			if (!data) {
				socket.emit('loginError', Error.unexpectedError())
				return;
			}
			
			if (!data.email || !data.password) {
				socket.emit('loginError', Error.missingCredentials());
				return;
			};
		});
		
		socket.on('createAccountCredentials', async data => {
			const snapshot = await users.get();
			let userEmail = [];
			let userUsername = [];
			snapshot.forEach(doc => {
				userEmail.push(doc.id);
				userUsername.push(doc.data().username);
			});
			
		  if (!data) return socket.emit('signUpError', Error.unexpectedError())
		
	    if (!data.email || !data.password || !data.confirmPassword || !data.firstName || !data.lastName || !data.username) return socket.emit('signUpError', Error.missingCredentials());
		  
		  if (!data.email.includes('@') || data.email.length < 6 || !data.email.includes('.')) return socket.emit('signUpError', Error.customError('Invalid Email'));
		  
		  if (data.password.length < 8) return socket.emit('signUpError', Error.customError('Password must be greater than 8 characters'))
		  
		  if (data.password != data.confirmPassword) return socket.emit('signUpError', Error.customError('Passwords must match'));
		  
		  if (userEmail.includes(data.email)) return socket.emit('signUpError', Error.customError('Email already in use'))
		  
		  if (userUsername.includes(data.username)) return socket.emit('signUpError', Error.customError('Username already in use'))
		  
		  
		  
		  const salt = await bcrypt.genSalt(Math.floor(Math.random() * 10 + 1)).catch(console.log);

			const hash = await bcrypt.hash(data.password, salt).catch(console.log);
			
				let res = await users.doc(data.email).set({
			  	email: data.email,
			  	firstName: data.firstName,
			  	lastName: data.lastName,
			  	username: data.username,
			  	password: hash
			  })
			  .catch(console.log)
		  
		  if (!res) 
		    console.log('An error occured when trying to add a user to the database');
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