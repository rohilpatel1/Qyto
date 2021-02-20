const socket = io.connect();

const login = document.getElementById('login');

function getValue(id) {
	return document.getElementById(id).value
}

login.addEventListener('click', _ => {
	socket.emit('loginCredentials', {
		email: getValue('email'),
		password: getValue('password')
	});
});

socket.on('loginError', error => {
	alert(error);
})