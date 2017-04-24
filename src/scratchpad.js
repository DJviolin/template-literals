'use strict';

/*const state = {
  global: {
    key: 'value',
  },
};*/

/*function checkNested(obj) {
  for (let i = 1; i < arguments.length; i += 1) {
    if (!obj.hasOwnProperty(arguments[i])) {
      return false;
    }
    obj = obj[arguments[i]];
  }
  return true;
}

checkNested(state.global.flash.params);

const ifExists = (obj) => {
  let bool = false;
  try {
    if (eval(obj).length > 0) {
      bool = true;
    }
  } catch (err) {
    bool = false;
  }
  return bool;
};

ifExists(state.global.flash.params);*/

/*const ifExists = (obj) => {
  let bool = true;
  if (obj === undefined && obj === null) {
    bool = false;
  }
  return bool;
};

ifExists(state.global.flash.params);*/

/*const ifExists = (obj) => {
  //return !!obj;
  function UserException(message) {
    this.message = message;
    this.name = 'UserException';
  }
  try {
    if (obj === undefined || obj === null) {
      throw new UserException('error');
    }
    return true;
  } catch (e) {
    console.log(e.message, e.name);
    return false;
  }
};

ifExists(state.global.flash.params);*/

//console.log(!!state.global.flash.params);

/*if (typeof state.global.flash.params === 'undefined' && typeof state.global.flash.params === 'null') {
  console.log('result');
}*/

/*try {
  state.global.flash.params;
} catch (err) {
  console.log('err');
}*/

/*const ifExists = (obj) => {
  try {
    const result = eval(obj);
    console.log(JSON.stringify(result, null, 4));
  } catch (err) {
    console.log('err');
  }
};*/

/*const state = {
  global: {
    key: 'value',
  },
};

const checkNested = (obj) => {
  try {
    return eval(obj);
  } catch (err) {
    return undefined;
  }
};
console.log(checkNested('state.global'));
console.log(checkNested('state.global.flash.params'));
console.log(checkNested('state.global.key'));*/


/*
<div id="app"></div>

const state = {
  global: {
    key: 'value',
  },
};

const checkNested = (obj) => {
  try {
    return eval(obj);
  } catch (err) {
    return undefined;
  }
};

console.log(checkNested('state.global'));
console.log(checkNested('state.global.meta.lang'));

const render = () => {
  return `
    <div>
      Hello, World on ${checkNested('state.global.meta.lang') || 'english'} language!
    </div>
  `;
}

render();
*/

const state = {
  global: {
    key: 'value',
  },
  meta: {
    lang: 'hu-HU',
    foo: {},
  },
};

const checkNestedFast = (obj, ...args) => {
  const length = args.length;
  for (let i = 1; i < length; i += 1) {
    if (!obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
};

console.log(checkNestedFast(state)); // => true
console.log(checkNestedFast(state.meta)); // => true
console.log(checkNestedFast(state.meta, 'lang')); // => true
console.log(checkNestedFast(state.meta, 'lang', 'foo', 'bar')); // => false
console.log(checkNestedFast(state.meta, 'lang', 'foo', 'bar', 'baz')); // => false
