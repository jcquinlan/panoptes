import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import axios from 'axios';

import App from './App';
import { hasKeyGuard } from './guards/hasKeyGuard';
import { SET_USER, LOGIN } from './constants/actions';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers';

import ProjectListView from './views/ProjectListView';
import PeopleListView from './views/PeopleListView';
import LoginView from './views/LoginView';
import './index.scss';

const store = createStore(reducer);

// Check to see what is stored in localStorage when the app starts.
const onAppInit = (nextState, replace, callback) => {
    const user = localStorage.getItem('user');
    const api_key = localStorage.getItem('api_key');
    const company = localStorage.getItem('company');

    if(api_key && company){
          axios.defaults.baseURL = `http://${ company }.teamwork.com`;
          axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(api_key + ':anything');
    }

    if(user && api_key && company){
        store.dispatch({ type: SET_USER, user: JSON.parse(user) })
        store.dispatch({ type: LOGIN, isLoggedIn: true })
        // Callback is like a "next" function, app initialization is stopped until it is called.
        callback();
    } else if(api_key && company){
        axios.get('/me.json').then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.person));
            store.dispatch({ type: SET_USER, user: response.data.person })
            // Callback is like a "next" function, app initialization is stopped until it is called.
            callback();
        })
    }
    callback();
  };

ReactDOM.render(
  (
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ App } onEnter={ onAppInit }>
            <IndexRoute component={ ProjectListView } onEnter={ hasKeyGuard }/>
            <Route path="login" component={ LoginView }></Route>
            <Route path="people" component={ PeopleListView } onEnter={ hasKeyGuard }></Route>
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
