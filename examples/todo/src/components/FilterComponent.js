'use strict';

import React, {PropTypes} from 'react';

require('styles//Filter.css');

class FilterComponent extends React.Component {
  render() {
    return (
      <div className="filter-component">
        <button onClick={this.props.onSubmit}>
          {this.props.showDone ? 'Show open and done' : 'Only show open'}
        </button>
      </div>
    );
  }
}

FilterComponent.displayName = 'FilterComponent';

FilterComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showDone: PropTypes.bool.isRequired
};

// FilterComponent.defaultProps = {};

export default FilterComponent;
