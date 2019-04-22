import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// COMPONENT LIBRARY
import {
  Segment as SUI_Segment,
  Container as SUI_Container,
} from 'semantic-ui-react';
import { message as Antd_Message, Modal as Antd_Modal } from 'antd';

//APP COMPONENTS
import AppHeader from './AppHeader';

// CONTAINER COMPONENTS
import Home from '../Home';
import Overtime from '../Overtime';
import DayOff from '../DayOff';

// Authentication HOC
import AuthWrapper from '../Auth/AuthWrapper';

// Auth Reusable Functions
import { isLoggedIn, removeToken } from '../Auth/Auth';

// Fetch data from GraphQL API
import { graphql, compose } from 'react-apollo';
import { fetchUsers } from '../Graphql/queries';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 'home',
    };
  }

  // FetchGithubUsers = () => {
  //   axios.get('https://api.github.com/users?page=3&per_page=100').then(resp => {
  //     console.log(resp.data);
  //     this.setState({ users: resp.data });
  //   });
  // };

  handleMenuItemClick = e => {
    const activeMenuItem = e.target.id;

    if (activeMenuItem !== 'signout') {
      if (activeMenuItem !== this.state.activeMenuItem) {
        this.setState({ activeMenuItem });
      }
    }
  };

  handleSignout = e => {
    if (e.key === 'MenuItem-Signout') {
      if (isLoggedIn()) {
        Antd_Modal.confirm({
          title: 'Are you sure you want to signout?',
          okText: 'Yes',
          onOk: () => {
            removeToken();
            this.props.history.replace('/signin');
            Antd_Message.success('Account has been signed out');
          },
        });
      }
    }
  };

  componentWillMount() {
    // this.props.history.push('/');
  }

  componentDidMount() {
    // this.FetchGithubUsers();
  }

  render() {
    const { activeMenuItem } = this.state;
    const { username, userId } = this.props.tokenContent;
    // console.log(`App userId: ${userId}`);

    const { users } = this.props.data;

    let usersList;
    if (users) {
      usersList = users
        .map(user => {
          if (user._id !== userId) {
            return { ...user };
          }
        })
        .filter(user => user);
    }

    return (
      <Router>
        <div style={{ height: '100vh' }}>
          <AppHeader
            handleMenuItemClick={this.handleMenuItemClick}
            activeMenuItem={activeMenuItem}
            loggedInUser={username}
            handleSignout={this.handleSignout}
          />
          <SUI_Container fluid style={{ height: '88%', overflowY: 'auto' }}>
            <SUI_Segment basic padded style={{}}>
              <SUI_Segment basic>
                <Switch>
                  <Route exact path="/" component={() => <Home />} />
                  <Route
                    path="/overtime"
                    component={() => (
                      <Overtime userId={userId} users={usersList} />
                    )}
                  />
                  <Route
                    path="/dayoff"
                    component={() => (
                      <DayOff userId={userId} users={usersList} />
                    )}
                  />
                  <Route render={() => <h1>Page Not Found</h1>} />
                </Switch>
              </SUI_Segment>
            </SUI_Segment>
          </SUI_Container>
        </div>
      </Router>
    );
  }
}

export default AuthWrapper(compose(graphql(fetchUsers))(App));
