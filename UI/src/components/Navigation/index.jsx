import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Custom Imports
import { Logout } from '../../utils/actions/authentication.action';

import { colors } from '../../theme';

// Class for navigation bar component
class Navigation extends React.Component {
  static propTypes = { Logout: PropTypes.func.isRequired };
  constructor(props) {
    super(props);
    this.handleClick = (e) => {
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementsByName(e)[0].classList.add('active');
    };

    this.logOut = this.logOut.bind(this);
  }

  // Function to be called for logging out the user
  logOut() {
    this.props.Logout();
    this.props.history.push('/homepage');
  }

  render() {
    return (
      <ul className="vertical medium-horizontal menu navigationmenu" style={{ backgroundColor: colors.white }}>
        {JSON.parse(sessionStorage.getItem('isLoggedin')) !== null ?
          (<React.Fragment>
            <li name="dashboard" className="active">
              <Link onClick={() => this.handleClick('dashboard')} to="/dashboard">HOME</Link>
            </li>
            {JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' && <li name="digitalVault">
              <Link onClick={() => this.handleClick('digitalVault')} to="/digitalVault">DIGITAL VAULT</Link></li>}
            <li name="changePassword">
              <Link onClick={() => this.handleClick('changePassword')} to="/changePassword">SETTINGS</Link>
            </li>
            {JSON.parse(sessionStorage.getItem('user')).data.role !== 'admin' && <li name="error">
              <Link onClick={() => this.handleClick('error')} to="/error">FINANCES</Link>
            </li>}
            {(JSON.parse(sessionStorage.getItem('user')).data.role === 'admin' || JSON.parse(sessionStorage.getItem('user')).data.role === 'buyer') &&<li name="users">
              <Link onClick={() => this.handleClick('users')} to="/users">{JSON.parse(sessionStorage.getItem('user')).data.role === 'buyer'?'SUPPLIERS':'USERS'}</Link>
            </li>}
            <li name="login">
              <Link onClick={this.logOut} to="/homepage">LOG OUT</Link>
            </li></React.Fragment>) :

          (<React.Fragment>
            <li name="homepage" className="active">
              <Link onClick={() => this.handleClick('homepage')} to="/homepage">HOME</Link>
            </li>
            <li name="aboutus">
              <Link onClick={() => this.handleClick('aboutus')} to="/aboutus">ABOUT US</Link>
            </li>
            <li name="contact">
              <Link onClick={() => this.handleClick('contact')} to="/contact">CONTACT US</Link>
            </li>
            <li name="error">
              <Link onClick={() => this.handleClick('error')} to="/error">OUR TEAM</Link>
            </li>
            <li name="login"><Link onClick={() => this.handleClick('login')} to="/login">LOGIN</Link>
            </li>
          </React.Fragment>)
        }
        <li name="settings">
          <i className="fas fa-search search" style={{ color: colors.navyBlue }} />
        </li>
      </ul>
    );
  }
}

export default withRouter(connect(null, { Logout })(Navigation));