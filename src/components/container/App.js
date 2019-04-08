import React, { Component } from 'react';
import axios from 'axios';

import { Grid, Segment, Button, Menu } from 'semantic-ui-react';

import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';

import AppHeader from '../presentation/AppHeader';

class App extends Component {
  constructor() {
    super();
    this.state = { activeMenuItem: 'home' };
  }

  fetchRandomUsers = () => {
    axios.get('https://api.github.com/users?page=3&per_page=100').then(resp => {
      console.log(resp.data);
      this.setState({ users: resp.data });
    });
  };

  componentDidMount() {
    this.fetchRandomUsers();
  }

  render() {
    const options = {
      sectionClassName: 'section',
      anchors: ['overtime', 'leave', 'statistics'],
      scrollBar: false,
      navigation: false,
      verticalAlign: true,
      sectionPaddingTop: '90px',
      sectionPaddingBottom: '10',
      arrowNavigation: true,
    };

    return (
      <div>
        <AppHeader />
        <ScrollToTopOnMount />
        <SectionsContainer className="container" {...options}>
          <Section color="grey">
            <Segment basic padded style={{ height: '100%' }}>
              OVERTIME
            </Segment>
          </Section>

        </SectionsContainer>
      </div>
    );
  }
}

export default App;
