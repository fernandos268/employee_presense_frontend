import React from 'react';
import {
  Menu,
  Segment,
  Grid,
  Icon,
  Header as SUI_Header,
} from 'semantic-ui-react';
import { Header } from 'react-fullpage';

const AppHeader = () => (
  <Header>
    <Grid
      padded
      celled
      style={{
        background: 'linear-gradient(to top right, #232526 , #414345)',
        boxShadow: " 0px 3px 9px -4px rgba(61,60,61,0.8)"
      }}
    >
      <Grid.Column>
        <Menu secondary inverted size="large" stackable>
          <Menu.Item header>
            <SUI_Header as="h3" color="blue">
              <Icon name="settings" />
              <SUI_Header.Content>
                Employee Presence
                <SUI_Header.Subheader style={{ color: 'lightgrey' }}>
                  Leave & Overtime Tracker
                </SUI_Header.Subheader>
              </SUI_Header.Content>
            </SUI_Header>
          </Menu.Item>
          <Menu.Menu position="right" size="massive" color="blue">
            <Menu.Item color="blue" >
              Overtime
            </Menu.Item>
            <Menu.Item color="blue" >
              Leave
            </Menu.Item>
            <Menu.Item color="blue" >
              Statistics
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Column>
    </Grid>
  </Header>
);

export default AppHeader;
