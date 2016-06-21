'use strict';

import React from 'react';

require('styles//Link.css');

class LinkComponent extends React.Component {
  render() {
    return (
      <div className="link-component">
         {this.props.link}
      </div>
    );
  }
}

LinkComponent.displayName = 'LinkComponent';

// Uncomment properties you need
LinkComponent.propTypes = {
  link: React.PropTypes.element.isRequired
};
// LinkComponent.defaultProps = {};

export default LinkComponent;
