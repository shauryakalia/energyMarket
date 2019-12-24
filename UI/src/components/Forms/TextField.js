import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormsy } from 'formsy-react';

// Custom Imports
import {
  colors
} from '../../theme';

// Class for TextField component
class TextField extends Component {
  static propTypes = {
    showError: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    getValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  // Function to be called on value change
  changeValue(event) {
    this.props.setValue(event.currentTarget.value, this.props.name);
  }

  render() { // eslint-disable-next-line no-nested-ternary
    const className = 'textInputStyle ' + (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : null);
    const errorMessage = this.props.getErrorMessage();
    const { id, label, rpp } = this.props;

    const labelClassName = (this.props.label === "" || this.props.label === null || this.props.label === undefined) ? "text-color text-bold displayOff" : "text-color text-bold";
    return (
      <div className="form-group">
        <label className={labelClassName} style={{ fontSize: '16px' }} htmlFor={id}>{label} {label === 'Volume' && !rpp && <span style={{ fontSize: '9px' }}>(3)</span>}<span className='redHighlight'>*</span></label>
        <input
          id={this.props.id}
          className={`${className}`}
          type={this.props.type ? this.props.type : 'text'}
          onChange={this.changeValue}
          value={this.props.getValue()}
          placeholder={this.props.placeholder}
          min={this.props.min}
          step={this.props.step}
          onInput={this.props.changingFunction}
          disabled={this.props.disabled}
          inputprops={{ inputProps: { min: 1000, max: 10 } }}
        />
        <span style={{ color: colors.red }}>{errorMessage}</span>
      </div >
    );
  }
}

export default withFormsy(TextField);
