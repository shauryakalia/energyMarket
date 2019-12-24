import React from 'react';
import { withFormsy } from 'formsy-react';

// Class for radiogroup component
class MyRadioGroup extends React.Component {
  state = {};

  componentDidMount() {
    const value = this.props.value;
    this.props.setValue(value, this.props.name);
    this.setState({ value });
  }

  // function  for on value change
  changeValue = (value) => {
    this.props.setValue(value, this.props.name);
    this.setState({ value });
  }

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    const { name, title, items } = this.props;
    return (
      <div className={className} >
        <label className="text-color text-bold" style={{ fontSize: '16px' }} htmlFor={name}>{title} <span className="redHighlight">{this.props.isRequired() ? '*' : ''}</span></label>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'inline-block' }}>
            <input
              type="radio"
              name={name}
              onChange={this.changeValue.bind(this, item)}
              checked={this.state.value === item}
            />
            <span style={{ paddingLeft: '5px', paddingRight: '75px' }}>{item.toString()}</span>
          </div>
        ))
        }
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(MyRadioGroup);
