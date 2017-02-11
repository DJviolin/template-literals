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

console.time('benchmark');

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

console.timeEnd('benchmark');

console.log(loop('<li>Number <<>></li>\n', [6, 7, 8]));
