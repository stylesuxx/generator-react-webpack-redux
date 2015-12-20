const redux = require('redux');
const reducers = require('../reducers');

const configureStore = function(initialState) {
  const store = redux.createStore(reducers, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

module.exports = configureStore;
