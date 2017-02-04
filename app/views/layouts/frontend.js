'use strict';

const htmlHead = require('../components/htmlHead');
const htmlBottom = require('../components/htmlBottom');

module.exports = (content, { obj }) => `
	${htmlHead({ obj })}

	${content}

	${htmlBottom()}
`;
