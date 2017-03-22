'use strict';

const htmlHead = require('../partials/htmlHead');
const htmlBottom = require('../partials/htmlBottom');

module.exports = (content, { state }) => `
  ${htmlHead({ state })}

  ${content}

  ${htmlBottom()}
`;
