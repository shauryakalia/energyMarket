import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

// Custom Imports
import './index.css';
import App from './containers/App';
import store from './utils/Store';
import screenResize from './utils/actions/ui.actions';

const render = () => {
    window.addEventListener('load', () => {
        store.dispatch(screenResize(window.innerWidth));
    });

    window.addEventListener('resize', () => {
        store.dispatch(screenResize(window.innerWidth));
    });

    ReactDOM.render(<Provider store={store}><AppContainer><App /></AppContainer></Provider>, document.getElementById('root'));
};

// Render once
render(App);

// Webpack Hot Module Replacement API
if (module.hot) { // eslint-disable-line no-undef
    module.hot.accept('./containers/App', () => { // eslint-disable-line no-undef
        render(App);
    });
}

