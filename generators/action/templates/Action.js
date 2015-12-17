let types = require('../constants/ActionTypes');

const function <%= actionName %>(parameter) {
  return { type: types.<%= actionConstant %>, parameter: parameter };
}

export default <%= actionName %>;
