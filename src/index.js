import React from 'react';
import ReactDOM from 'react-dom';

// GraphQL API Imports
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Component Library / Styling
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

// Auth Helper Functions
import { getToken } from './components/Auth/Auth';

// Components
import App from './components/AppContainer/App';
import Signin from './components/Signin';
import Signup from './components/Signup';

// SETUP APOLLO CLIENT - To connect to the GraphQL API
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
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('app')
);

module.hot.accept();
