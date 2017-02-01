const mainTop = require('../partials/mainTop');
const mainBottom = require('../partials/mainBottom');

module.exports = (content) => {return `
${mainTop}

${content}

${mainBottom()}
`}
