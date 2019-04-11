import React from 'react';
import { Menu, Grid, Icon, Header as SUI_Header } from 'semantic-ui-react';

import { Link, withRouter } from 'react-router-dom';

import propTypes from 'prop-types';

const AppHeader = props => {
  return (
    <Grid
      padded
      style={{
        background: 'linear-gradient(to top right, #141E30 ,#243B55)',
        boxShadow: '-2px 7px 12px -2px rgba(120,115,115,0.75)',
        height: '12%',
      }}
      verticalAlign="middle"
    >
      <Grid.Column>
        <Menu
          secondary
          style={{ background: 'transparent' }}
          size="huge"
          stackable
        >
          <Menu.Item header>
            <SUI_Header as="h2" color="blue">
              <Icon name="settings" />
              <SUI_Header.Content>
                Employee Presence
                <SUI_Header.Subheader style={{ color: 'lightgrey' }}>
                  Overtime & Leave Management
                </SUI_Header.Subheader>
              </SUI_Header.Content>
            </SUI_Header>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              id="home"
              color="blue"
              style={{ color: 'white' }}
              active={props.activeMenuItem === 'home'}
              onClick={e => props.handleMenuItemClick(e)}
              as={Link}
              to="/"
            >
              <Icon name="home" style={{ pointerEvents: 'none' }} />
              Home
            </Menu.Item>
            <Menu.Item
              id="overtime"
              color="blue"
              style={{ color: 'white' }}
              active={props.activeMenuItem === 'overtime'}
              onClick={e => props.handleMenuItemClick(e)}
              as={Link}
              to="/overtime"
            >
              <Icon name="clock outline" style={{ pointerEvents: 'none' }} />
              Overtime
            </Menu.Item>
            <Menu.Item
              id="dayoff"
              color="blue"
              style={{ color: 'white' }}
              active={props.activeMenuItem === 'dayoff'}
              onClick={e => props.handleMenuItemClick(e)}
              as={Link}
              to="/dayoff"
            >
              <Icon
                name="calendar times outline"
                style={{ pointerEvents: 'none' }}
              />
              Day Off
            </Menu.Item>
            <Menu.Item
              id="statistics"
              color="blue"
              style={{ color: 'white' }}
              active={props.activeMenuItem === 'statistics'}
              onClick={e => props.handleMenuItemClick(e)}
              as={Link}
              to="/statistics"
            >
              <Icon name="chart line" style={{ pointerEvents: 'none' }} />
              Statistics
            </Menu.Item>
            <Menu.Item />
            <Menu.Item
              id="signout"
              as={Link}
              to="/signout"
              style={{ color: 'white' }}
              onClick={e => props.handleMenuItemClick(e)}
            >
              <Icon name="sign-out" style={{ pointerEvents: 'none' }} />
              Signout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Column>
    </Grid>
  );
};

AppHeader.propTypes = {
  handleMenuItemClick: propTypes.func.isRequired,
  activeMenuItem: propTypes.string,
};

export default AppHeader;
