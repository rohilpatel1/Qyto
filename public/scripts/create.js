const socket = io.connect();

const create = document.getElementById('create');

function getValue(id) {
	return document.getElementById(id).value;
}

create.addEventListener('click', () => {
	socket.emit('createAccountCredentials', {
		username: getValue('username'),
		email: getValue('email'),
		firstName: getValue('fname'),
		lastName: getValue('lname'),
		password: getValue('password'),
		confirmPassword: getValue('confirmPassword')
	});
});

