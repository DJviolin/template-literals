'use strict';

function makeElement(type, text) {
  const el = document.createElement(type);
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
  return el;
}

const h1 = text => makeElement('h1', text);

//const app = h1('Hello, World!');
//document.body.appendChild(app);

const app = document.getElementById('app');
//app.innerHtml = h1('Hello, World!');

const content = h1('Hello, World!');

app.appendChild(content);
