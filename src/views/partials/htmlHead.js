'use strict';

module.exports = ({ obj }) => `
  <!doctype html>
  <html class="no-js" lang="${obj.lang || 'en-US'}">
  <head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>${obj.title}</title>
  <meta name="description" content="${obj.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
  <!--[if lte IE 9]>
    <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
  <![endif]-->
`;
