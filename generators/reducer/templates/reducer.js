const initialState = {
  /* Define your initial state here */
}

const <%= reducerName %> = function (state = initialState, action) {
  var nextState = Object.assign({}, state);

  switch (action.type) {
    /*
    case 'YOUR_ACTION': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    */
    default: {
      return state;
    }
  }
}

module.exports = <%= reducerName %>;
