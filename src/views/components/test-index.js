'use strict';

const test = require('./test');
const htmlHead = require('../partials/htmlHead');

const addition2 = (var1, var2) => {
  test.addition({ num1: var1, num2: var2 });
};

const htmlHeadWrapper = (title, description) => {
  //htmlHead({ title: title, description: description });
  htmlHead({ title, description });
};

module.exports = {
  addition2,
  htmlHeadWrapper,
};
