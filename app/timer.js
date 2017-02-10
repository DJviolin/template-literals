'use strict';

// https://nodejs.org/api/console.html#console_console_time_label

console.time('benchmark');

// 14.5ms
/*for (let i = 0; i < 1000000; i += 1) {
	;
}*/

// 5.8ms
/*let i = 1000000;
while (i > 0) {
	;
	i -= 1;
}*/

// 5.8ms
let i = 0;
while (i < 1000000) {
	;
	i += 1;
}

console.timeEnd('benchmark');


console.time('benchmark2');
Array(5).join(0).split(0).map((item, i) => `
	<div>I am item number ${i}.</div>
`).join('');
console.timeEnd('benchmark2');

console.time('benchmark3');
for (let j = 0; j < 5; j += 1) {
	`<div>I am item number ${j}.</div>`;
}
console.timeEnd('benchmark3');

console.time('benchmark4');
const loop = (elem) => {
	let results = '';
	for (let j = 0; j < elem; j += 1) {
		results += `<li>Number ${j}</li>\n`;
	}
	return results;
};
loop(5);
console.timeEnd('benchmark4');

console.time('benchmark5');
const loop2 = (elem) => {
	for (let j = 0; j < elem; j += 1) {
		`<li>Number ${j}</li>\n`;
	}
};
loop2(5);
console.timeEnd('benchmark5');
