'use strict';

import React from 'react';

import LoginComponent from './LoginComponent';
import LinkComponent from './LinkComponent';

require('styles//Index.css');

class IndexComponent extends React.Component {
  render() {
    var elem = <LoginComponent login={this.props.loginAction}/>;
    if(this.props.login) {
      elem = <LinkComponent url={this.props.url} />;
    }
    return (
      <div className="index-component">
        {elem}
      </div>
    );
  }
}

IndexComponent.displayName = 'IndexComponent';

// Uncomment properties you need
IndexComponent.propTypes = {
  loginAction: React.PropTypes.func.isRequired,
  url: React.PropTypes.string.isRequired,
  login: React.PropTypes.bool.isRequired
};
IndexComponent.defaultProps = {
  login: false
};

export default IndexComponent;
