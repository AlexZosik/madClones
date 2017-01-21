import { 
  browserHistory, 
  IndexRoute, 
  Router, 
  Route 
} from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { RequiresAuthentication } from './utils/authentiationWrappers';

import { authenticateIfNeeded } from '../src/app/routes/login/modules/login';
import configureStore from './store/configureStore';

import BoardView from './app/routes/home/routes/boardView/BoardViewContainer';
import SignUp from './app/routes/signUp/SignUpContainer';
import Login from './app/routes/login/LoginContainer';
import Home from './app/routes/home/HomeContainer';
import App from './app/AppContainer';

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

if (localStorage.getItem('userId')) {
  store.dispatch(authenticateIfNeeded());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="login" component={Login} />
      <Route path="signup" component={SignUp} />
      <Route path="/" component={RequiresAuthentication(App)} >
        <IndexRoute component={Home} />
        <Route path="boards/:id" component={BoardView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);