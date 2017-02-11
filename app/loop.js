//const loop = (elem) => {
const loop = (...args) => {
  console.log(args);
  let results = '';
  try {
    for (let i = 0; i < args[1].length; i += 1) {
      results += `<li>Number ${args[1][i]}</li>\n`;
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      results = `
        <span style="color: #f00; font-weight: bold; font-style: italic;">
          Render error:<br />
          ${err}<br />
        </span>
      `;
    } else {
      results = '';
    }
  }
  return results;
};

//console.log(loop([6, 7, 8]));

//loop(`<li>Number ${args[1]}}</li>\n`, [6, 7, 8]);
console.log(loop(`<li>Number ${this}}</li>\n`, [6, 7, 8]));
//console.log(loop(6, 7, 8));

/*function foo(...args) {
  //return arguments;
  return args;
}
console.log(foo(1, 2, 3)); // { "0": 1, "1": 2, "2": 3 }*/