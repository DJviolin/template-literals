'use strict';

function is_prime(v, n) {
  let bool = true;
  for (let i = 0; i < v.length; ++i) {
    if (i === 0 || n % v[i - 1] === 0) {
      bool = false;
    }
  }
  return bool;
}

function show_primes(v) {
  for (let i = 0; i < v.length; ++i) {
    console.log(`${v[i]}, `);
  }
}

function main() {
  const primes = [];

  const max = 100;

  for (let i = 2; i <= max; ++i) {
    if (is_prime(primes, i) === true) {
      primes.push(i);
    }
    //primes.push(i);
  }

  //const primes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ];

  show_primes(primes);

  return 0;
}

main();
