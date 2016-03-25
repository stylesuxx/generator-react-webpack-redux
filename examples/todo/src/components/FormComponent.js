'use strict';

import React, {PropTypes} from 'react';

require('styles//Form.css');

class FormComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = this.refs.textInput.value;
    if(text !== '') {
      this.props.onSubmit(text);
      this.refs.textInput.value = '';
    }
  }

  render() {
    return (
      <div className="form-component" onSubmit={this.handleSubmit}>
        <form>
          <input type="text" ref="textInput" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

FormComponent.displayName = 'FormComponent';

FormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

// FormComponent.defaultProps = {};

export default FormComponent;
