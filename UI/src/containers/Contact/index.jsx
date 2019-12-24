import React from 'react';

// Custom Imports
import ContactForm from '../../components/Forms/ContactForm';

import { colors } from '../../theme';

import logo from '../../images/verde-blocks-logo_original.png';

// Container for Contact us component
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  // Function to be called when form is valid
  enableButton() {
    this.setState({ canSubmit: true });
  }

  // Function to be called when form is invalid
  disableButton() {
    this.setState({ canSubmit: false });
  }

  // Function to be called for submitting form
  submit(data) {
    // TODO api integration
  }

  render() {
    const { canSubmit } = this.state;
    return (
      <div className="grid-x app-content" style={{ background: colors.lightGreen, border: colors.white }}>
        <div className="cell small-6">
          <div className="grid-y" style={{ margin: '15%' }}>
            <div className="cell small-6 medium-8 large-2" style={{ color: colors.navyBlue }}>
              <h4 style={{ fontWeight: 'bold' }}>Contact Us</h4>
            </div>
            <br />
            <div className="cell small-6 medium-4 large-10 content" style={{ color: colors.regularGray }}>
              <ContactForm canSubmit={canSubmit} submit={this.submit} enableButton={this.enableButton} disableButton={this.disableButton} />
            </div>
          </div>
        </div>
        <div className="cell small-6">
          <ul>
            <img alt="logo" src={logo} className="logoBanner" />
          </ul>
        </div>
      </div>
    );
  }
}

export default Contact;