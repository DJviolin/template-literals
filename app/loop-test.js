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
