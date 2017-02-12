'use strict';

// https://gist.github.com/AoJ/547bc678347c18a4051c

function fibonacci(n) {
  if (n < 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

module.exports = (n) => {
  if (typeof n !== 'number') throw new Error('Wrong arguments');
  return fibonacci(n); // Functional programming
};
