'use strict';

import React from 'react';

require('styles//Login.css');

class LoginComponent extends React.Component {
  render() {
    return (
      <div className="login-component">
        <button onClick={this.props.login}>login</button>
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';

// Uncomment properties you need
LoginComponent.propTypes = {
  login: React.PropTypes.func.isRequired
};
// LoginComponent.defaultProps = {};

export default LoginComponent;
