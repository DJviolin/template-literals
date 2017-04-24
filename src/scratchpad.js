'use strict';

const state = {};

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

const ifExists = (obj) => {
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

ifExists(state.global.flash.params);
