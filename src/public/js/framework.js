'use strict';

// https://hackernoon.com/how-i-converted-my-react-app-to-vanillajs-and-whether-or-not-it-was-a-terrible-idea-4b14b1b2faff

function makeElement(type) {
  return document.createElement(type);
}

const h1 = () => makeElement(`h1`);

// testing
document.body.appendChild(h1());
