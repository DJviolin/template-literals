const test = require('./test');

const addition2 = (var1, var2) => {
	return test.addition({ num1: var1, num2: var2 });
};

module.exports = {
	addition2,
};
