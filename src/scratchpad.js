'use strict';

const state = {
  global: {
    key: 'value',
  },
};

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

const checkNested = (obj) => {
  try {
    //const ev = eval;
    //console.log(JSON.stringify(eval(obj), null, 4));
    return eval(obj);
    //return ev(obj);
  } catch (err) {
    //console.log('err');
    return false;
  }
};

//ifExists('state.global.flash.params');
//ifExists(state.global);
//ifExists('state.global');
//ifExists('state.global.flash.params');
console.log(checkNested('state.global'));
