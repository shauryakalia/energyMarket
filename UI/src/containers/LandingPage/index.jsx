import React from 'react';
import PropTypes from 'prop-types';
import { Redirect,Route } from 'react-router-dom';

// Custom Imports
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Authentication from '../../utils/Authentication';
import { SubRoutes, PublicPath } from '../../Routes';
import Login from '../../containers/Login'

// Container for logged out pages routing
const LandingPage = ({ location, routes, error }) => (
  <div className="app-container">
    <Header />
    {error ? <Route path="/login" component={Login} />:
    <div>
      {location.pathname === '/' ? (
        <Redirect
          to={{
            pathname: '/homepage',
          }}
        />
      )
      : routes.map(route => {return (Authentication.checkAuthentication() === null && route.AuthenticationRequired )?  <Redirect to={{ pathname: '/homepage'}}/>: <SubRoutes key={route.path} {...route} />})}
    </div>}
    <Footer />
  </div>
);

LandingPage.defaultProps = {
  routes: [],
};

LandingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    component: PropTypes.func,
    exact: PropTypes.bool,
  })),
};

export default LandingPage;
