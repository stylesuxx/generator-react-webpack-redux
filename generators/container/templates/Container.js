import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../<%= prefix %>components/Main';

class <%= name %> extends Component {
  render() {
    const {actions} = this.props;
    return <Main actions={actions}/>;
  }
}

<%= name %>.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>);
