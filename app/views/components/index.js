const test = require('./test');
const htmlHead = require('./htmlHead');

const addition2 = (var1, var2) => {
	return test.addition({ num1: var1, num2: var2 });
};

const htmlHeadWrapper = (title, description) => {
	return htmlHead({ title: title, description: description });
};

module.exports = {
	addition2,
	htmlHeadWrapper,
};
