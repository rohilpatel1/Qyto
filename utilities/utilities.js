const ejsData = {};

ejsData.cssLibs = `
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

`

ejsData.jsLibs = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.0/socket.io.js"></script>
`


let dir = __dirname.replace('utilities', 'public/views/')

const RenderFile = (res, file, data) => {
	let fullEjsData =  { ...ejsData, ...data };
	
	res.render(`${dir}${file}`, fullEjsData);
};

class Errors {
	unexpectedError() {
		return "An unexpected error occured. Try again later"
	}
	missingCredentials() {
		return "At least one input field is incomplete"
	}
}

module.exports = { RenderFile, Errors };