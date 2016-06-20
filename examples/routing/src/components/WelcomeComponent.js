'use strict';

import React from 'react';

require('styles//Welcome.css');

class WelcomeComponent extends React.Component {
  render() {
    let welcome = '';
    if(this.props.login) {
      welcome = 'You are logged in';
    }
    return (
      <div className="welcome-component">
        {welcome}
      </div>
    );
  }
}

WelcomeComponent.displayName = 'WelcomeComponent';

// Uncomment properties you need
WelcomeComponent.propTypes = {
  login: React.PropTypes.bool.isRequired
};
WelcomeComponent.defaultProps = {
  login: false
};

export default WelcomeComponent;
