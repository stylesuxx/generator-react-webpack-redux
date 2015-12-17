let types = require('../constants/ActionTypes');

const <%= actionName %> = function(parameter) {
  return { type: types.<%= actionConstant %>, parameter: parameter };
}

export default <%= actionName %>;
