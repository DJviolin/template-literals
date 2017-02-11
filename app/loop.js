const loop = (elem) => {
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
console.log(loop([6, 7, 8]));
