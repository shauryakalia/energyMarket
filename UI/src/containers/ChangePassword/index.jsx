import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Simplert from 'react-simplert';

// Custom Imports
import ChangePasswordForm from '../../components/Forms/ChangePassword';
import BackendServices from '../../Services/BackendServices';

import {
    background, colors
} from '../../theme';

import logo from '../../images/verde-blocks-logo_original.png';

// Container for Login component 
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(sessionStorage.getItem('user')),
            showAlert: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.myForm = 'form';
        this.errorDiv = 'errorDiv';
        this.closeSimplert = this.closeSimplert.bind(this);
    }

    closeSimplert() {
        this.props.history.push('/dashboard')
    }

    // Function to be called on submit of form
    onSubmit(form) {
        BackendServices.setPassword(this.state.user.data.userId, form.oldPassword, form.newPassword)
            .then((response) => {
                this.creatAlert("success", "Request Completed Successfully", `${response.data.message}`)
            })
            .catch((err) => {
                if (err.response) {
                    this.creatAlert("error", "Error", `${err.response.data.message}`)
                } else {
                    this.creatAlert("error", "Error", "Something went wrong. Please login again.")
                }
            });
    }

    // Function to be called on change of input fields
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    creatAlert(alertType, alertTitle, alertMessage) {
        this.setState({
            showAlert: true,
            alertType,
            alertTitle,
            alertMessage
        })
    }

    render() {
        return (
            <div>
                <Simplert
                    showSimplert={this.state.showAlert}
                    type={this.state.alertType}
                    title={this.state.alertTitle}
                    message={this.state.alertMessage}
                    disableOverlayClick={true}
                    onClose={this.closeSimplert}
                />
                <div
                    className="grid-x form-container"
                    style={{ ...background, color: colors.white }}
                >

                    <div className="small-8 medium-4 large-4 small-offset-2 medium-offset-4 large-offset-4" style={{ padding: '2% 0%' }}>
                        <div className="cell small-6">
                            <ul style={{ marginLeft: '4rem', marginBottom: '2rem' }}>
                                <img alt="verde blocks" style={{ width: '83%' }} src={logo} />
                            </ul>
                        </div>
                        <ChangePasswordForm onSubmit={this.onSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
};

export default ChangePassword;
