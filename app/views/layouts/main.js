const mainTop = require('../partials/mainTop');
//const index = require('../index');
const mainBottom = require('../partials/mainBottom');

module.exports = (content) => {return `
${mainTop()}

${content}

${mainBottom()}
`}
