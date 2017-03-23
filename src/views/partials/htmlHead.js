'use strict';

module.exports = ({ state }) => `
  <!doctype html>
  <html class="no-js" lang="${state.meta.lang || 'en-US'}">
  <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>${state.meta.title + ' | ' || ''}${state.global.sitename}</title>
  <meta name="description" content="${state.meta.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
  <!--[if lte IE 9]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->

  <p>ctx.isAuthenticated(): ${state.global.login ? true : false}</p>
  <p>Full object: ${JSON.stringify(state, null, 4)}</p>
`;
