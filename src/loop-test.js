console.time('benchmark');

const loop = (html, obj) => {
  let results = '';
  //const split = elem.split(/<<>>/); // '<li>Number <<>></li>'
  //console.log(split);
  try {
    for (let i = 0; i < obj.length; i += 1) {
      const str = html.replace(/<<>>/g, obj[i]);
      results += `${str}\n`;
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

console.log(loop('<li class="list-<<>>">Number <<>></li>', [6, 7, 8]));

console.timeEnd('benchmark');


console.time('benchmark2');

const loop2 = (elem1, obj, elem2) => {
  let results = '';
  try {
    for (let i = 0; i < obj.length; i += 1) {
      results += `${elem1}${obj[i]}${elem2}\n`;
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

console.log(loop2('<li>Number ', [6, 7, 8], '</li>'));

console.timeEnd('benchmark2');
