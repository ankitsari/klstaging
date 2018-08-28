// Import Required modules.
import React from 'react';
import ReactDOM from 'react-dom';
// Import styles.
import style from './styles/style.css';
// Importing components.
import App from './components/app';
import Home from './components/home';
import Header from './components/header';
import Header1 from './components/header1';
import HomePage from './components/homepage';
import Prettify from './components/prettify';

import Footer from './components/footer';
import AboutUs from './components/about';

import Privacy from './components/privacy';
import Terms from './components/terms';
import Contact from './components/contact';
import MyKnowledgeLocker from './components/Knowledgelocker';

require('./styles/font-awesome-4.7.0/css/font-awesome.css');

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store, { history } from './store';

let requireAuthentication = (nextState, replace) => {
    !store.getState().user.isLoggedIn?replace('/authentication/login'):null
};

let authToken = localStorage.getItem('authToken');
if (authToken==null || authToken=='') {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.setItem('userData', []);
}

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="header" component={Header}/>
        <Route path="header1" component={Header1}/>
        <Route path="homepage" component={HomePage}/>
        <Route path="AboutUs" component={AboutUs}/>
        <Route path="privacy" component={Privacy}/>
        <Route path="terms" component={Terms}/>
        <Route path="contact" component={Contact}/>
        <Route path="prettify" component={Prettify}/>
        <Route path="myKnowledgeLocker" component={MyKnowledgeLocker}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render( 
    router,
    document.getElementById('root')
);