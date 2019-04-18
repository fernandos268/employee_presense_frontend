import React from 'react';
import { Menu, Grid as SUI_Grid, Icon, Header as SUI_Header, Dropdown as SUI_Dropdown } from 'semantic-ui-react';
import { Dropdown as Antd_Dropdown, Menu as Antd_Menu, Icon as Antd_Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom';

import propTypes from 'prop-types';


const AppHeader = props => {

  const trigger = (
    <span style={{ color: "white" }}>
      <Icon name="user circle" /> {props.loggedInUser}
    </span>
  );

  const menu = (
    <Antd_Menu onClick={e => props.handleSignout(e)}>
      <Antd_Menu.Item key="MenuItem-Profile" name="Opening Profile...">
        <Antd_Icon type="user" />
        Profile
      </Antd_Menu.Item>
      <Antd_Menu.Item key="MenuItem-Signout" name="Logging out...">
        <Antd_Icon type="export" />
        Sign-out
      </Antd_Menu.Item>
    </Antd_Menu>
  );

  return (
    <SUI_Grid
      padded
      style={{
        background: 'linear-gradient(to top right, #141E30 ,#243B55)',
        boxShadow: '0 8px 32px #aaa',
        height: '12%',
      }}
      verticalAlign="middle"
    >
      <SUI_Grid.Column style={{ height: '100%' }}>
        <Menu
          secondary
          style={{ background: 'transparent', height: '100%' }}
          size="large"
          stackable
          fluid
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
            <Menu.Item />
            <Menu.Item>
              <Antd_Dropdown overlay={menu}>
                <SUI_Dropdown trigger={trigger} icon={null} />
              </Antd_Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </SUI_Grid.Column>
    </SUI_Grid>
  );
};

AppHeader.propTypes = {
  handleMenuItemClick: propTypes.func.isRequired,
  activeMenuItem: propTypes.string,
};

export default AppHeader;


{/* <Menu.Item
id="signout"
style={{ color: 'white' }}
onClick={e => props.handleMenuItemClick(e)}
>
<Icon name="sign-out" style={{ pointerEvents: 'none' }} />
Signout

</Menu.Item> */}