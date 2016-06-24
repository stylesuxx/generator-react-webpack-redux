import React, {
  Component,
  PropTypes
} from 'react';
import {login} from '../actions/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import IndexComponent from '../components/IndexComponent';

class IndexRoute extends Component {
  render() {
    const {actions, user} = this.props;
    const link = <Link to='/self'>Member Area</Link>;
    return (
      <div className="indexroute-component">
        <IndexComponent
          login={user.login}
          loginAction={actions.login}
          link={link} />
      </div>
    );
  }
}

IndexRoute.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = { user: state.user };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = { login: login };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexRoute);
