'use strict';

import React, { PropTypes } from 'react';

require('styles//Self.css');

class SelfComponent extends React.Component {
  render() {
    let elem = <p>Not logged in!</p>;
    if(this.props.login) elem = <p>You are logged in</p>;
    return (
      <div className="self-component">
        {elem}
      </div>
    );
  }
}

SelfComponent.displayName = 'SelfComponent';

// Uncomment properties you need
SelfComponent.propTypes = {
  login: PropTypes.bool.isRequired
};
// SelfComponent.defaultProps = {};

export default SelfComponent;
