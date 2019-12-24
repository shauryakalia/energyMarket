import React from 'react';
import { withFormsy } from 'formsy-react';

class SetRadio extends React.Component {

  state = {};

  componentDidMount() {
    const value = this.props.value;
    this.props.setValue(value);
    this.setState({ value });
  }

  changeValue = (value) => {
    this.props.setValue(value);
    this.setState({ value });
    this.props.setRadio(value);
  }


  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    const { name, title, items } = this.props;
    return (
      <div className={className} >
        <label className="text-color text-bold" style={{ fontSize: '16px' }} htmlFor={name}>{title}{this.props.isRequired() ? '*' : null}</label>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'inline-block' }}>
            <input
              type="radio"
              name={name}
              onChange={this.changeValue.bind(this, item)}
              checked={this.state.value === item}
            />
            <span style={{ paddingLeft: '5px', paddingRight: '55px' }}>{item.toString()}</span>
          </div>
        ))
        }
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
}

export default withFormsy(SetRadio);
