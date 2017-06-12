import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './component/App';
import { AppContainer } from 'react-hot-loader';
import { overrideComponentTypeChecker } from 'react-toolbox';

const rootEl = document.getElementById('app');

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import client from './apolloClient/index';
import rootReducer from './reducers/index'
import routes from './routes';

const store = createStore(
  rootReducer,
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

const render = () => {
  ReactDOM.render(
    <ApolloProvider store={store} client={client}>
      <AppContainer>
        <Router history={hashHistory} routes={routes}/>
      </AppContainer>
    </ApolloProvider>,
    rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  overrideComponentTypeChecker((classType, reactElement) => (
    reactElement && (
      reactElement.type === classType
      || reactElement.type.name === classType.displayName
    )
  ));
  if (module.hot) {
    module.hot.accept('./component/App', render);
  }
}

render();
