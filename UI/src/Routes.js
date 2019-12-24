import { Route, Redirect } from 'react-router-dom';
import React from 'react';

// Custom Imports
import AboutUs from './containers/AboutUs';
import Authentication from './utils/Authentication';
import Contact from './containers/Contact';
import Homepage from './containers/Homepage';
import LandingPage from './containers/LandingPage';
import Login from './containers/Login';
import UserDashboard from './containers/UserDashboard'
import RPPForm from './components/Rppform'
import Registration from './containers/Registration'
import ChangePassword from './containers/ChangePassword'
import DigitalVault from './containers/DigitalVault'
import PlantImage from './containers/Registration/PlantImageUpload.jsx'
import Account from './containers/Account'
import NotFound from './containers/NotFound'
import Users from './containers/Users'

// Function for defining sub routes for navigation bar
export const SubRoutes = (route, i,error) => (
    <Route
        key={i}
        exact={route.exact}
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} error={route.error}/>}
    />
);

// Function for defining route for login
export const PrivateRoutes = (route, i,error) => (
    <Route
        key={i}
        exact={route.exact}
        path={route.path}
        render={props =>
            (Authentication.checkAuthentication() ? (
                <route.component {...props} routes={route.routes} error={route.error} />
            ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                        }}
                        {...props}
                    />
                ))
        }
    />
);

export const Routes = [
    {
        path: '/',
        component: LandingPage,

        routes: [
            {
                AuthenticationRequired: false,
                path: '/homepage',
                component: Homepage,
                exact:true,
            },
            {
                AuthenticationRequired: false,
                path: '/aboutus',
                component: AboutUs,
            },
            {
                AuthenticationRequired: false,
                path: '/login',
                component: Login,
            },
            {
                AuthenticationRequired: false,
                path: '/contact',
                component: Contact,
            }, {
                AuthenticationRequired: true,
                path: '/dashboard',
                component: UserDashboard,

            }, {
                AuthenticationRequired: true,
                path: '/rpp',
                component: RPPForm
            }, {
                AuthenticationRequired: true,
                path: '/register',
                component: Registration
            }, {
                AuthenticationRequired: true,
                path: '/changePassword',
                component: ChangePassword
            }, {
                AuthenticationRequired: true,
                path: '/settings',
                component: Account
            }, {
                AuthenticationRequired: true,
                path: '/digitalVault',
                component: DigitalVault
            }, {
                AuthenticationRequired: true,
                path: '/uploadPlantImages',
                component: PlantImage
            }, {
                AuthenticationRequired: true,
                path: '/error',
                component: NotFound
            }, {
                AuthenticationRequired: true,
                path: '/users',
                component: Users
            }]
    },
];
