import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getToken } from './components/Auth/Auth';

import SignupOld from './components/Auth/signupForm';

import App from './components/AppContainer/App';
import Signin from './components/Signin';
import Signup from './components/Signup';

// SETUP APOLLO CLIENT
const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
  request: operation => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  onError: ({ networkError, graphQLErrors }) =>
    console.log('graphQLErrors', graphQLErrors),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);

module.hot.accept();
