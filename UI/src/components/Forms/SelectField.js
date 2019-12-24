import React, { Component } from 'react';
import Select from 'react-select';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';

// Class for Select Field component
class SelectField extends Component {
  static propTypes = {
    setValue: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    isFormSubmitted: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isRequired: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    getValue: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  // Function to be called on value change
  changeValue(value, ) {
    if (this.props.isMulti) {
      this.props.setValue(value, this.props.name);
    } else {
      this.props.setValue(value, this.props.name);
    }
  }

  render() {
    const className =
      !this.props.isValid() && this.props.isFormSubmitted()
        ? 'is-invalid'
        : null;
    const { id, label } = this.props;
    return (
      <div className="form-group" id={id}>
        <label className="text-color text-bold" style={{ fontSize: '16px' }} htmlFor={id}>{label} <span className="redHighlight">{this.props.isRequired() ? '*' : ''}</span></label>
        <Select
          ref={(c) => {
            this.select = c;
          }}
          className={className}
          name={this.props.name}
          clearable={false}
          isMulti={this.props.isMulti}
          value={this.props.getValue()}
          options={this.props.options}
          onChange={this.changeValue}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={this.props.required}
        />
      </div >
    );
  }
}

export default withFormsy(SelectField);
