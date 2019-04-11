import React, { Component } from 'react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

// COMPONENT LIBRARY
import { Segment, Container } from 'semantic-ui-react';

//APP COMPONENTS
import AppHeader from '../presentational/AppHeader';

// CONTAINER COMPONENTS
import HomeContainer from './HomeContainer';
import Overtime from '../Overtime';
import DayOff from '../DayOff';
import StatisticsContainer from './StatisticsContainer';
import SignoutContainer from './SignoutContainer';

// PRESENTATIONAL COMPONENT

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeMenuItem: 'home', isLoggedIn: true };
  }

  FetchGithubUsers = () => {
    axios.get('https://api.github.com/users?page=3&per_page=100').then(resp => {
      console.log(resp.data);
      this.setState({ users: resp.data });
    });
  };

  handleMenuItemClick = e => {
    const activeMenuItem = e.target.id;

    if (activeMenuItem !== 'signout') {
      if (activeMenuItem !== this.state.activeMenuItem) {
        this.setState({ activeMenuItem });
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
    const { isLoggedIn, activeMenuItem } = this.state;

    return (
      <Router>
        <div style={{ height: '100vh' }}>
          <AppHeader
            handleMenuItemClick={this.handleMenuItemClick}
            activeMenuItem={activeMenuItem}
          />
          <Container fluid style={{ height: '88%' }}>
            <Segment basic padded style={{ height: '100%' }}>
              <Segment style={{ height: '100%', overflowX: 'auto' }} raised>
                <Switch>
                  <Route exact path="/" component={HomeContainer} />
                  <Route path="/overtime" component={Overtime} />
                  <Route path="/dayoff" component={DayOff} />
                  <Route path="/statistics" component={StatisticsContainer} />
                  <Route path="/signout" component={SignoutContainer} />
                  <Route render={() => <h1>Page Not Found</h1>} />
                </Switch>
              </Segment>
            </Segment>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
