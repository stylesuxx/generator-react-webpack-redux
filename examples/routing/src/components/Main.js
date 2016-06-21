require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';

import IndexRoute from '../containers/IndexRoute';
import SelfRoute from '../containers/SelfRoute';

//import IndexComponent from './IndexComponent';
//import WelcomeComponent from './WelcomeComponent';

import { Router, Route, browserHistory } from 'react-router';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <Router history={browserHistory}>
          <Route path='/' component={IndexRoute}></Route>
          <Route path='/self' component={SelfRoute}></Route>
        </Router>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};
/*
<IndexComponent
  login={this.props.user.login}
  loginAction={this.props.actions.login}
  url="somepath" />
<WelcomeComponent login={this.props.user.login} />
*/

export default AppComponent;
