'use strict';

/*
  ${state.global.flash === undefined ? '' : `
    <p class="flash ${state.global.flash.type}">
      ${state.global.flash.message}
    </p>
  `}
*/

// <title>${state.meta.title === undefined ? '' : `${state.meta.title} | `}${state.global.sitename}</title>

module.exports = ({ state }) => `
  <!doctype html>
  <html class="no-js" lang="${state.filters.check(state, 'meta', 'lang') || 'en-US'}">
  <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>${!state.filters.check(state, 'meta', 'title') ? '' : `${state.meta.title} | `}${state.global.sitename}</title>
  <meta name="description" content="${state.filters.check(state, 'meta', 'description') || ''}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
  <!--[if lte IE 9]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->

  <p>ctx.isAuthenticated(): ${state.global.isAuthenticated ? true : false}</p>
  <p>ctx.state === ${state.filters.json(state)}</p>

  ${state.filters.isEmpty(state.global.flash) ? '' : `
    <p class="flash ${state.global.flash.type}">
      ${state.global.flash.message}
    </p>
  `}

  ${state.filters.json(state.filters.check(state, 'meta'))}<br>
  ${state.filters.check(state.meta, 'lang')}<br>
  ${state.filters.check(state.meta, 'lang', 'test', 'key', 'gone')}<br>
  ${state.filters.check(state.meta, 'lang', 'test', 'key', 'gone') || 'en-US'}<br><br>
`;
