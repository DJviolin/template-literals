//const loop = (elem) => {
const loop = (...args) => {
  return arguments;
  /*let results = '';
  try {
    //for (let i = 0; i < elem.length; i += 1) {
    for (let i = 0; i < 3; i += 1) {
      //results += `<li>Number ${elem[i]}</li>\n`;
      console.log(`${arguments[0]} || ${arguments[1]}`);
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
  return results;*/
};

//console.log(loop([6, 7, 8]));

//console.log(loop(`<li>Number }</li>\n`, [6, 7, 8]));
console.log(loop(6, 7, 8));

function foo(...args) {
  return arguments;
}
console.log(foo(1, 2, 3)); // { "0": 1, "1": 2, "2": 3 }

const bar = (...args) => {
  //return arguments;
  return args;
}
console.log(bar(1, 2, 3));
