const ejsData = {};

const RenderFile = (res, file, data) => {
	let fullEjsData =  { ...ejsData, ...data };
	
	res.render(`/home/runner/Qyto/public/views/${file}.html`, data);
};

module.exports = { RenderFile };