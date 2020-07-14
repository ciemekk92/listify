import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WebFont from 'webfontloader';
import App from './views/App/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './store/reducers/user';
import listReducer from './store/reducers/list';

WebFont.load({
    google: {
        families: ['Open Sans Condensed:300,700', 'sans-serif']
    }
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

const rootReducer = combineReducers({ user: userReducer, list: listReducer });

const store = createStore(
    rootReducer,
    composeEnhancers?.(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
