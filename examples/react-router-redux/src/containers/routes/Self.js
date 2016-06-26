import React, {
  Component,
  PropTypes
} from 'react';
import {} from '../../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelfComponent from '../../components/SelfComponent';

class Self extends Component {
  render() {
    return <SelfComponent login={ this.props.user.login }/>;
  }
}

self.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = { user: state.user };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Self);
