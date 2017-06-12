import React from 'react';
import { Router, hashHistory,Route, IndexRoute } from 'react-router';

import App from './component/App';
import LoginForm from './component/LoginForm';
import SignupForm from './component/SignupForm';
import Dashboard from './component/Dashboard';
import requireAuth from './component/requireAuth';

export default (
            <Route path="/" component={App}>
              <Route path="login" component={LoginForm} />
              <Route path="signup" component={SignupForm} />
              <Route path="dashboard" component={requireAuth(Dashboard)} />
            </Route>
);
