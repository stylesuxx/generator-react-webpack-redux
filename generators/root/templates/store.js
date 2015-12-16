const redux = require('redux');
const reducers = require('../reducers');

const store = redux.createStore(reducers);

module.exports = store;
