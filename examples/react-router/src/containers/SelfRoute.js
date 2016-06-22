import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import WelcomeComponent from '../components/WelcomeComponent';

class SelfRoute extends Component {
  render() {
    const {actions, user} = this.props;
    return (
      <WelcomeComponent login={user.login}/>
    );
  }
}

SelfRoute.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SelfRoute);
