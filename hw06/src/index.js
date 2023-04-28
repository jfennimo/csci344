import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {getAccessToken} from './utils';

// Kicks off the app after the user "logs in":
async function renderApp() {
<<<<<<< HEAD
    const token = await getAccessToken('joel', 'joel_password');
    // const token = await getAccessToken('webdev', 'password');
=======
    // const token = await getAccessToken('joel', 'joel_password');
    const token = await getAccessToken('webdev', 'password');
>>>>>>> 24470cb2249094871bf0ea251fb142e9e9107854
    
    ReactDOM.render(
        <App token={token} />,
        document.getElementById('root')
    );
}

renderApp();