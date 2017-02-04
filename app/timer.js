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
