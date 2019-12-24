import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Custom Imports
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { SubRoutes } from '../../Routes';

// Container for logged out pages routing
const Dashboard = ({ location, routes }) => (
    <div className="app-container">
        <Header />
        <div>
            {routes.map(route => <SubRoutes key={route.path} {...route} />)}
        </div>
        <Footer />
    </div>
);

Dashboard.defaultProps = {
    routes: [],
};

Dashboard.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        component: PropTypes.func,
        exact: PropTypes.bool,
    })),
};

export default Dashboard;
