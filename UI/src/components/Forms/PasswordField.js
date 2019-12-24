import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

// Custom Imports
import { colors } from '../../theme';

// Class for Password component
class PasswordField extends Component {
  static propTypes = {
    setValue: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    getValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  // Function to be called on value change
  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() { // eslint-disable-next-line no-nested-ternary
    const className = this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null;
    const errorMessage = this.props.getErrorMessage();

    return (
      <div className="form-group inset-control">
        <label htmlFor={this.props.id} className="form-label">
          <input
            ref={(c) => {
              this[this.props.id] = c;
            }}
            id={this.props.id}
            className={className}
            style={{ border: 'solid 1px rgb(187,187,187)', borderRadius: '8px', color: colors.navyBlue }}
            type="password"
            onChange={this.changeValue}
            value={this.props.getValue()}
            autoComplete="off"
            placeholder={this.props.placeholder}
          />
          <div
            ref={(c) => {
              this.toggle = c;
            }}
            className="btn btn-link btn-sm d-none"
            onClick={() => { }}
            onKeyPress={this.handleKeyPress}
            role="button"
            tabIndex="0"
          />
          <span>{errorMessage}</span>
        </label>

      </div>
    );
  }
}

export default withFormsy(PasswordField);
