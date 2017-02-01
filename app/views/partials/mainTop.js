/*module.exports = (obj) => {return `
<!doctype html>
<html class="no-js" lang="">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>${JSON.stringify(obj, null, 4)}}</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/main.css">
		<script src="js/vendor/modernizr-2.8.3.min.js"></script>-->
	</head>
	<body>
		<!--[if lte IE 9]>
			<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
		<![endif]-->
`}*/

/*const state = {
	title: "Hello, World from state object!",
};*/
//const state = {};
//module.exports.state = state;
const state = (obj) => {
	return obj;
};
module.exports.state = state;

//state.title = "Hello, World!";

const render = `
	<!doctype html>
	<html class="no-js" lang="">
	<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>${JSON.stringify(state, null, 4)}}</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!--<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/main.css">
	<script src="js/vendor/modernizr-2.8.3.min.js"></script>-->
	</head>
	<body>
	<!--[if lte IE 9]>
		<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
	<![endif]-->
`;
module.exports.render = render;
