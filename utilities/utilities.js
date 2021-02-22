const ejsData = require('./ejsData');


let dir = __dirname.replace('utilities', 'public/views/');

const RenderFile = (res, file, data) => {
	let fullEjsData =  { ...ejsData, ...data };
	
	res.render(dir + file, fullEjsData);
};

module.exports = { RenderFile };