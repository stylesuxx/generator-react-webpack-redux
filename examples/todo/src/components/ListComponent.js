'use strict';

import React, {PropTypes} from 'react';
import TodoComponent from './TodoComponent';

require('styles//List.css');

class ListComponent extends React.Component {
  getItem(item, key, onToggle, onRemove) {
    return (
      <TodoComponent
        item={item}
        key={key}
        id={key}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    );
  }

  buildList(items, onToggle, onRemove, done) {
    var todos = [];
    for(var i in items) {
      const current = items[i];
      if(!current.done && done) {
        todos.push(this.getItem(current, i, onToggle, onRemove));
      }

      if(!done) {
        todos.push(this.getItem(current, i, onToggle, onRemove));
      }
    }

    return todos;
  }

  render() {
    const {todos, onToggle, onRemove, showDone} = this.props;
    const list = this.buildList(todos, onToggle, onRemove, showDone).reverse();
    return (
      <div className="list-component">
        {list}
      </div>
    );
  }
}

ListComponent.displayName = 'ListComponent';

ListComponent.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  showDone: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired
};

// ListComponent.defaultProps = {};

export default ListComponent;
