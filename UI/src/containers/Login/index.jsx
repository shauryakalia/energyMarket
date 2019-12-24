import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Custom Imports
import LoginForm from '../../components/Forms/LoginForm';
import Authentication from '../../utils/Authentication';
import { Authenticate } from '../../utils/actions/authentication.action';

import {
  background, colors, errorDiv, textLabel,
} from '../../theme';

import logo from '../../images/verde-blocks-logo_original.png';

// Container for Login component
class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.myForm = 'form';
    this.errorDiv = 'errorDiv';
  }

  componentWillMount() {
    if (Authentication.checkAuthentication()) {
      this.props.history.push('/dashboard');
    }
    console.log(Authentication.checkAuthentication())
  }

  componentDidMount() {
    if (this.props.authentication) {
      if (this.props.authentication.error) { // eslint-disable-next-line react/no-string-refs
        this.refs.errorDiv.style.display = 'block';
      }
    }
  }

  // Function to be called on submit of form
  onSubmit(form) {
    const user = {
      email: form.email,
      password: form.password,
    };
    this.props.Authenticate(user);
  }

  // Function to be called on change of input fields
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
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
          <div style={{ color: colors.red, ...errorDiv, ...textLabel }} ref={this.errorDiv}>
            <div>
              {"Those credentials weren't recognised."}
            </div>
            <div>
              Please try again or
              {' '}
              {' '}
              <a
                href="/verifyemail"
              >
                reset your password.
              </a>
            </div>
          </div>
          <LoginForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  Authenticate: PropTypes.func.isRequired,
  authentication: PropTypes.object,
};

Login.defaultProps = {
  history: undefined, // FIXME
  authentication: undefined, // FIXME
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps, { Authenticate })(Login);
