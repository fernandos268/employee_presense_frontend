import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getToken } from './components/Auth/Auth'

import App from './components/AppContainer/App';
import UserSignin from './components/Auth/SigninForm';
import UserSignup from './components/Auth/signupForm';

// SETUP APOLLO CLIENT
const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
  request: async operation => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signin" component={UserSignin} />
        <Route exact path="/signup" component={UserSignup} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);

module.hot.accept();
