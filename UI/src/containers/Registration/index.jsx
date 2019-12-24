import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Simplert from 'react-simplert';

// Custom Imports
import RegistrationForm from '../../components/Forms/RegistrationForm'
import Register from '../../utils/actions/register.action';

// Container for Registration component
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false, plantImages: [], openModal: false, role: '', disableCSS: "cell buttonStyle disabled" };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeSimplert = this.closeSimplert.bind(this);
  }

  closeSimplert() {
    this.props.history.push('/dashboard')
  }

  creatAlert(alertType, alertTitle, alertMessage) {
    this.setState({
      showAlert: true,
      alertType,
      alertTitle,
      alertMessage
    })
  }

  // Function to be called when form is valid
  enableButton() {
    this.setState({ canSubmit: true });
    this.setState({ disableCSS: "cell buttonStyle buttonBgSubmit" });
  }

  // Function to be called when form is invalid
  disableButton() {
    this.setState({ canSubmit: false });
    this.setState({ disableCSS: "cell buttonStyle disabled" });
  }

  // Function to be called for submitting form
  async onSubmit(form) {
    const user = {
      id: JSON.parse(sessionStorage.getItem('user')).data.userId,
      role: form.role.value,
      companyName: form.companyName,
      address: form.address,
      contactName: form.contactName,
      title: form.title,
      signetAccount: form.signetAccount,
      phone: form.phone,
      email: form.email,
      creditLimit: form.creditLimit,
      creditAvailable: form.creditAvailable,
      agreementType: form.agreementType.value,
    };
    await this.props.Register(user);

    this.props.register && this.props.register.data && this.props.register.data.message &&
      this.creatAlert("success", "Request Completed Successfully", `${this.props.register.data.message}`)

    this.props.register && this.props.register.error && this.props.register.error.data.error &&
      this.creatAlert("error", "Request Rejected", `${this.props.register.error.data.message}`)
  }

  render() {
    const { canSubmit, disableCSS } = this.state;
    return (
      <div className="parent-bar">
        <Simplert
          showSimplert={this.state.showAlert}
          type={this.state.alertType}
          title={this.state.alertTitle}
          message={this.state.alertMessage}
          disableOverlayClick={true}
          onClose={this.closeSimplert}
        />
        {this.props.register && this.props.register.data && this.props.register.data.data &&
          this.props.history.push({
            pathname: '/uploadPlantImages',
            state: {
              addedUserId: this.props.register.data.data.addedUserId,
            }
          })
        }
        <RegistrationForm disableButton={this.disableButton} enableButton={this.enableButton} disableCSS={disableCSS} onSubmit={this.onSubmit} canSubmit={canSubmit} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register,
});

Registration.propTypes = {
  Register: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { Register })(Registration);