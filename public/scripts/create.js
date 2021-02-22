const socket = io.connect();

const create = document.getElementById('create');

function getValue(id) {
	return document.getElementById(id).value;
}

create.addEventListener('click', () => {
	socket.emit('createAccountCredentials', {
		email: getValue('email'),
		firstName: getValue('fname'),
		lastName: getValue('lname'),
		username: getValue('username'),
		password: getValue('password'),
		confirmPassword: getValue('confirmPassword')
	});
});

socket.on('signUpError', error => {
	alert(error);
});