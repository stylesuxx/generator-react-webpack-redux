import <%= actionConstant %> from './<%= importPath %>';

module.exports = function(parameter) {
  return { type: <%= actionConstant %>, parameter };
};
