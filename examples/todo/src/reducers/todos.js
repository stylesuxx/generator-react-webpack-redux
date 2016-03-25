import {ADD, TOGGLE, REMOVE} from '../actions/const'

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  items: [
    {
      text: 'This is todo #1',
      done: false
    },
    {
      text: 'This is todo #2',
      done: false
    }
  ]
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch(action.type) {

    case ADD: {
      nextState.items.push({
        text: action.parameter,
        done: false
      });

      return nextState;
    } break;

    case TOGGLE: {
      nextState.items[action.parameter].done = !nextState.items[action.parameter].done;

      return nextState;
    } break;

    case REMOVE: {
      nextState.items.splice(action.parameter, 1);

      return nextState;
    } break;

    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
