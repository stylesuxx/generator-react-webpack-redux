'use strict';

import React, {
  PropTypes
} from 'react';
import { Link } from 'react-router';

require('styles//Login.css');

class LoginComponent extends React.Component {
  render() {
    let elem = <button onClick={this.props.login}>Login</button>;
    if(this.props.loggedIn) {
      elem = <Link to='/example/self'>Member Area</Link>;
    }

    return (
      <div className="login-component">
        {elem}
      </div>
    );
  }
}

LoginComponent.displayName = 'LoginComponent';

LoginComponent.propTypes = {
  login: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default LoginComponent;
