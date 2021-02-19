const ejsData = {};

const RenderFile = (res, file, data) => {
	let fullEjsData =  { ...ejsData, ...data };
	res.render(file, data);
};