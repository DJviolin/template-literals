'use strict';

// https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff

// https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff#cba3

function makeElement(type, props, text) {
  const el = document.createElement(type);

  Object.keys(props).forEach(prop => {
    el[prop] = props[prop];
  });

  const textNode = document.createTextNode(text);

  el.appendChild(textNode);

  return el;
}

const h1 = (...args) => makeElement(`h1`, ...args);

// testing
document.body.appendChild(
  h1(
    { className: `title` },
    `Hello, World.`,
  ),
);
