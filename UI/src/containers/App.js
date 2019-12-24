import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';

// Custom Imports
import { colors } from '../theme';
import { Routes, SubRoutes, PrivateRoutes } from '../Routes';
import ErrorBoundary from '../containers/ErrorBoundary';

// Class for App component
class App extends Component {
  static propTypes = {
    authentication: PropTypes.object,
  };
  render() {
    document.onclick = function (evt) {
      if (clickedOutsideElement('hamBurgerID', evt)) {

        if (document.getElementsByClassName('hamChange') && document.getElementsByClassName('hamChange')[0]) {
          document.getElementsByClassName('hamChange')[0].classList.remove('hamChange');
        }

        if (document.getElementsByClassName('menu') && document.getElementsByClassName('menu')[0]) {
          document.getElementsByClassName('menu')[0].classList.add('displayMenuOff');
        }
      }
    }

    function clickedOutsideElement(elemId, evt) {
      var e = evt || window.event;
      var theElem = getEventTarget(e);

      while (theElem === theElem.offsetParent) {
        if (theElem.id === elemId)
          return false;
      }

      return true;
    }

    function getEventTarget(evt) {
      var targ = (evt.target) ? evt.target : evt.srcElement;

      if (targ && targ.nodeType === 3)
        targ = targ.parentNode;

      return targ;
    }

    let content = null;
    let error = this.props.authentication.error;
    if (this.props.authentication.loading) {
      content = (
        <div style={{ margin: '25% 50%' }}>
          <Loader type="Circles" style={{ color: colors.navyBlue }} height="80" width="80" />
        </div>);
    } else {
      content = (
        <span>{
          Routes.map(route =>
            (route.AuthenticationRequired ? (
              <PrivateRoutes key={route.path} error={error} {...route} />
            ) : (
                <SubRoutes key={route.path} error={error} {...route} />
              )))}
        </span>);
    }
    return (
      <Router>
        <div className="App">
          <ErrorBoundary>
            <NotificationContainer />
            {content}
          </ErrorBoundary>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

export default connect(mapStateToProps)(App);