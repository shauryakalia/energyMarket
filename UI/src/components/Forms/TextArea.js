import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

//Custom Imports
import { colors } from '../../theme';

// Class for TextArea component
class TextArea extends Component {
  static propTypes = {
    showError: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    isFormSubmitted: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  // Function to be called on value change
  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null;
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="form-label">
          <textarea
            formNoValidate
            id={this.props.id}
            className={`${className} ${this.props.className}`}
            rows="3"
            style={{ border: 'solid 1px #0B175F', borderRadius: '8px', color: colors.navyBlue, marginBottom: '3%' }}
            value={this.props.getValue()}
            placeholder={this.props.placeholder}
            onChange={this.changeValue}
            maxLength={this.props.maxlength}
          />
          <span>{errorMessage}</span>
        </label>

      </div>
    );
  }
}

export default withFormsy(TextArea);
