/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
require('normalize.css');
require('styles/App.css');

import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ListComponent from '../components/ListComponent';
import FormComponent from '../components/FormComponent';
import FilterComponent from '../components/FilterComponent';

let yeomanImage = require('../images/yeoman.png');

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, todos, visibility} = this.props;
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />

        <FormComponent onSubmit={actions.add} />

        <FilterComponent
          onSubmit={actions.visibility}
          showDone={visibility.showDone}
        />

        <ListComponent
          onToggle={actions.toggle}
          onRemove={actions.remove}
          showDone={visibility.showDone}
          todos={todos.items}
        />
      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  visibility: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {
    todos: state.todos,
    visibility: state.visibility
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    add: require('../actions/add.js'),
    toggle: require('../actions/toggle.js'),
    remove: require('../actions/remove.js'),
    visibility: require('../actions/visibility.js')
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
