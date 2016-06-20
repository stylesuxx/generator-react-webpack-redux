'use strict';

import React from 'react';

require('styles//Link.css');

class LinkComponent extends React.Component {
  render() {
    return (
      <div className="link-component">
        <a href={this.props.url}>To the member area</a>
      </div>
    );
  }
}

LinkComponent.displayName = 'LinkComponent';

// Uncomment properties you need
LinkComponent.propTypes = {
  url: React.PropTypes.string.isRequired
};
// LinkComponent.defaultProps = {};

export default LinkComponent;
