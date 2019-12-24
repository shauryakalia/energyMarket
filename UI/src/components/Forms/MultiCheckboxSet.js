import React from 'react';
import { withFormsy } from 'formsy-react';

function contains(container, item, cmp) {
  for (const it of container) {
    if (cmp(it, item)) {
      return true;
    }
  }
  return false;
}

// Class for MultiCheckbox set component
class MyMultiCheckboxSet extends React.Component {
  state = { value: [], cmp: (a, b) => a === b, setCheckbox: false };

  componentDidMount() {
    const value = this.props.value || [];
    this.props.setValue(value);
    this.setState({ value: value, cmp: this.props.cmp || this.state.cmp });
  }

  changeValue = (value, event) => {
    const checked = event.currentTarget.checked;
    let newValue = [];
    let index = -1;
    let tempIndex = -1;

    if (checked) {
      if (this.state.value.includes('5 X 8 (HE 1000 – HE 1700)') && value.includes('5 X 16 (HE 0800 – HE 2300)')) {
        tempIndex = (this.state.value).indexOf('5 X 8 (HE 1000 – HE 1700)');
        (this.state.value).splice(tempIndex, 1);
        this.setState({
          setCheckbox: false,
        })
      }

      if (this.state.value.length > 0 && (this.state.value.includes('7 X 24')
        || this.state.value.includes('Intermittent')
        || this.state.value.includes('5 X 16 (HE 0800 – HE 2300)')
        || this.state.value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)'))
      ) {

        if (this.state.value.includes('5 X 16 (HE 0800 – HE 2300)') && this.state.value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)') && value.includes('5 X 8 (HE 1000 – HE 1700)')) {
          (this.state.value).splice(0, 1);
          this.setState({
            setCheckbox: false,
          })
        }

        if (this.state.value.includes('5 X 8 (HE 1000 – HE 1700)') && this.state.value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)') && value.includes('5 X 16 (HE 0800 – HE 2300)')) {
          tempIndex = (this.state.value).indexOf('5 X 8 (HE 1000 – HE 1700)');
          (this.state.value).splice(tempIndex, 1);
          this.setState({
            setCheckbox: false,
          })
        }

        if (!((this.state.value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)') && value.includes('5 X 8 (HE 1000 – HE 1700)'))
          || (this.state.value.includes('5 X 8 (HE 1000 – HE 1700)') && value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)'))
          || (this.state.value.includes('5 X 16 (HE 0800 – HE 2300)') && value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)'))
          || (this.state.value.includes('5 X 8 & 2 X 24 (HE 2400 – HE 0700)') && value.includes('5 X 16 (HE 0800 – HE 2300)')))) {
          (this.state.value).splice(0, this.state.value.length);
          this.setState({
            setCheckbox: false,
          })
        }
      }

      newValue = this.state.value.concat(value);
      this.setState({
        value: newValue,
        setCheckbox: true
      }, function () {
        this.props.setValue(this.state.value)
      })
    }
    else {
      index = this.state.value.indexOf(value);

      if (index > -1) {
        (this.state.value).splice(index, 1);
      }
      this.setState({
        value: this.state.value,
        setCheckbox: true
      }, function () {
        this.props.setValue(this.state.value);
      });
    }

  }

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');
    const errorMessage = this.props.getErrorMessage();

    const { name, items } = this.props;
    return (
      <div className={className} style={{ display: 'flex' }}>

        {items.map((item, i) => (
          <div key={i}>
            <label className="text-color text-bold" style={{ fontSize: '16px' }} htmlFor={name}>
              {item === '7 X 24' ? '24/7' : item === '5 X 16 (HE 0800 – HE 2300)' ?
                'On Peak' :
                item === '5 X 8 & 2 X 24 (HE 2400 – HE 0700)' ?
                  'Off Peak' : item === '5 X 8 (HE 1000 – HE 1700)' ?
                    'Work Peak' : 'Intermittent'}{this.props.isRequired() ? '*'
                      : null}</label>
            <input
              type="checkbox"
              name={name}
              onChange={this.changeValue.bind(this, item)}
              checked={contains(this.state.value, item, this.state.cmp) && this.state.setCheckbox}
            />
            <span style={{ paddingLeft: '5px', paddingRight: '65px' }}>{item}</span>
          </div>
        ))
        }
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

}

export default withFormsy(MyMultiCheckboxSet);
