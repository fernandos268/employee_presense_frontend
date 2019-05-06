import React, { Component } from 'react';
import { message as Antd_Message, Modal as Antd_Modal } from 'antd';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux functions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestAllUsers, requestCurrentUserData } from '../../redux/actions';

// COMPONENT LIBRARY
import {
  Container as SUI_Container,
  Segment as SUI_Segment,
} from 'semantic-ui-react';

// Auth Reusable Functions
import { isLoggedIn, removeToken } from '../Auth/Auth';

// AUTHENTICATION HOC
import AuthWrapper from '../Auth/AuthWrapper';
import DayOff from '../DayOff';

// CONTAINER COMPONENTS
import Home from '../Home';
import Overtime from '../Overtime';
//APP COMPONENTS
import AppHeader from './AppHeader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuItem: 'home',
    };
  }

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

  componentDidUpdate() {
    console.log(this.props);
    // if (this.props.data.errors.length !== 0) {
    //   Antd_Message.error(this.props.data.errors);
    // }
  }

  componentDidMount() {
    const { userId } = this.props.tokenContent;
    this.props.requestAllUsers();
    this.props.requestCurrentUserData(userId);
  }

  render() {
    // console.log({ AppData: this.props.data });
    const { activeMenuItem } = this.state;
    const { username, userId } = this.props.tokenContent;

    const { isLoading, userData } = this.props.data;

    const { users } = this.props.data.users || [];
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
                  <Route
                    exact
                    path="/"
                    component={() => <Home userId={userId} />}
                  />
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

// USING REACT-APOLLO PATTERN
// const AppContainer = graphql(fetchUsers)(App);

const mapStateToProps = state => ({ data: state.UsersReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestAllUsers, requestCurrentUserData }, dispatch);

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AuthWrapper(AppContainer);
