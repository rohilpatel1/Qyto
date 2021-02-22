class Errors {
	internalError() {
		return "[500] Unexpected Error. Try again later"
	}
	missingCredentials() {
		return "Error: Please fill out all of the fields"
	}
	
	customError(text) {
		return `Error: ${text}`;
	}
}

module.exports = Errors;