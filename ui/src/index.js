import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SearchAList from './components/SearchAList';
import SpecificList from './components/SpecificList';
import Register from './components/Register';
import Login from './components/Login';
import List from './components/List';
import NavBar from './components/NavBar';
import {Router, Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Switch>
        <Route exact path='/' render={() => <NavBar name='App'><App /></NavBar>} />
        <Route path='/searchList' render={() => <NavBar name='SearchList'><SearchAList /></NavBar>} />
        <Route path='/specificList' render={() => <NavBar name='SpecificList'><SpecificList /></NavBar>} />
        <Route path='/register' render={() => <NavBar name='Register'><Register /></NavBar>} />
        <Route path='/login' render={() => <NavBar name='Login'><Login /></NavBar>} />
        <Route path='/list' render={() => <NavBar name='List'><List /></NavBar>} />
    </Switch>
</Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
