'use strict';

import React, {PropTypes} from 'react';

require('styles//Todo.css');

class TodoComponent extends React.Component {
  render() {
    const {item, id, onToggle, onRemove} = this.props;
    return (
      <div className="todo-component">
        <div className="text">
          <p>{item.text}</p>
        </div>
        <div className="buttons">
          <button onClick={() => onToggle(id)}>
            {item.done ? 'Undo' : 'Done'}
          </button>
          <button onClick={() => onRemove(id)}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

TodoComponent.displayName = 'TodoComponent';

TodoComponent.propTypes = {
    onToggle: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
};

// TodoComponent.defaultProps = {};

export default TodoComponent;
