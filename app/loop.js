/*const loop = (...args) => {
  //console.log(args);
  let results = '';
  try {
    for (let i = 0; i < args[1].length; i += 1) {
      //results += `<li>Number ${args[1][i]}</li>\n`;
      results += args[0];
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
};*/

/*console.time('benchmark');
const loop = (...args) => {
  let results = '';
  const split = args[0].split(/<<>>/);
  //console.log(split);
  for (let i = 0; i < args[1].length; i += 1) {
    //results += `<li>Number ${args[1][i]}</li>\n`;
    //results += args[0];
    results += `${split[0]}${args[1][i]}${split[1]}`;
  }
  return results;
};
console.timeEnd('benchmark');*/

/*console.time('benchmark');
const loop = (...args) => {
  //console.log(args);
  let results = '';
  const split = args[0].split(/<<>>/);
  //console.log(split);
  try {
    for (let i = 0; i < args[1].length; i += 1) {
      //results += `<li>Number ${args[1][i]}</li>\n`;
      results += `${split[0]}${args[1][i]}${split[1]}`;
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
loop('<li>Number <<>></li>\n', [6, 7, 8])
console.timeEnd('benchmark');*/

/*console.time('benchmark');
const loop = (elem, obj) => {
  //console.log(args);
  let results = '';
  const split = elem.split(/<<>>/);
  //console.log(split);
  try {
    for (let i = 0; i < obj.length; i += 1) {
      results += `${split[0]}${obj[i]}${split[1]}`;
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
loop('<li>Number <<>></li>\n', [6, 7, 8])
console.timeEnd('benchmark');*/

console.time('benchmark');
const loop = (elem1, elem2, obj) => {
  //console.log(args);
  let results = '';
  try {
    for (let i = 0; i < obj.length; i += 1) {
      results += `${elem1}${obj[i]}${elem2}\n`;
      //results += elem1 + obj[i] + elem2;
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
loop('<li>Number ', '</li>', [6, 7, 8])
console.timeEnd('benchmark');




console.time('benchmark2');
const loop2 = (elem) => {
  let results = '';
  try {
    for (let i = 0; i < elem.length; i += 1) {
      results += `<li>Number ${elem[i]}</li>\n`;
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
loop2([1, 2, 3, 4, 5])
console.timeEnd('benchmark2');
