import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/AppContainer/App';
import UserSignin from './components/Auth/SigninForm';

// SETUP APOLLO CLIENT
const client = new ApolloClient({
  uri: 'http://localhost:4040/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signin" component={UserSignin} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById('app')
);

module.hot.accept();
