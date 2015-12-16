const redux = require('redux');
const requireDir = require('require-dir');
const reducers = requireDir('./');

const root = redux.combineReducers(reducers);

module.exports = root;
