require('normalize.css');
require('styles/App.css');

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

let yeomanImage = require('../images/yeoman.png');

class App extends Component {
  render() {
    const { actions /*, todos*/ } = this.props
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/containers/App.js</code> to get started!</div>
      </div>
    )
  }
}

App.propTypes = {
  // TODO: Append here if reducers are added
  /*todos: PropTypes.array.isRequired,*/
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {
    // TODO: Append here if reducers are added
    /*items: state.items*/
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {
    // TODO: Append here if actions are added
    /*getItems: require(../src/actions/getItems.js)*/
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
