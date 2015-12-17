const <%= actionName %> = function(parameter) {
  return {
    type: '<%= actionConstant %>',
    parameter: parameter
  };
}

export default <%= actionName %>;
