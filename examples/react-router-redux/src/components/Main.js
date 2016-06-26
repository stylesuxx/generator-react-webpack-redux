require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice"><Link to="/example">react-router-redux example</Link></div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
