import <%= actionConstant %> from './const'

module.exports = function(parameter) {
  return { type: <%= actionConstant %>, parameter };
};
