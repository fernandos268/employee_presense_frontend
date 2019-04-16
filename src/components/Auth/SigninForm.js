import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { signinMutation } from '../Graphql/mutations';

import {
  Grid as SUI_Grid,
  Segment as SUI_Segment,
  Header as SUI_Header,
  Icon as SUI_Icon,
} from 'semantic-ui-react';

import {
  Form as Antd_Form,
  Icon as Antd_Icon,
  Input as Antd_Input,
  Button as Antd_Button,
  Checkbox as Antd_Checkbox,
  Row as Antd_Row,
} from 'antd';

import { withRouter } from 'react-router-dom';

class Signin_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      error: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const signinResponse = await this.props.signinMutation({
          variables: values,
        });
        console.log(signinResponse);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <SUI_Grid verticalAlign="middle" centered style={{ height: '100vh' }}>
        <SUI_Grid.Column width={5}>
          <SUI_Segment basic padded style={{ height: '100%' }}>
            <SUI_Segment
              color="blue"
              raised
              style={{ boxShadow: ' 5px 5px 21px 0px rgba(163,163,163,1)' }}
            >
              <SUI_Header as="h2" color="blue" attached="top">
                <SUI_Icon name="settings" />
                <SUI_Header.Content>
                  Employee Presence
                  <SUI_Header.Subheader style={{ color: 'grey' }}>
                    Overtime & Leave Management
                  </SUI_Header.Subheader>
                </SUI_Header.Content>
              </SUI_Header>
              <br />
              <Antd_Form onSubmit={this.handleSubmit} className="login-form">
                <Antd_Form.Item>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ],
                  })(
                    <Antd_Input
                      size="large"
                      prefix={
                        <Antd_Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder="Email Address"
                    />
                  )}
                </Antd_Form.Item>
                <Antd_Form.Item>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ],
                  })(
                    <Antd_Input
                      size="large"
                      prefix={
                        <Antd_Icon
                          type="lock"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </Antd_Form.Item>
                <Antd_Form.Item>
                  <Antd_Button
                    block
                    shape="round"
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    Signin
                  </Antd_Button>
                </Antd_Form.Item>
              </Antd_Form>
              <SUI_Grid
                columns={2}
                divided
                stackable
                centered
                style={{ width: '100%' }}
              >
                <SUI_Grid.Column>
                  <Antd_Row type="flex" justify="end">
                    <a name="forgotpassword">Forgot passwordsss</a>
                  </Antd_Row>
                </SUI_Grid.Column>
                <SUI_Grid.Column>
                  <a name="signup">Sign up here</a>
                </SUI_Grid.Column>
              </SUI_Grid>
              <br />
            </SUI_Segment>
          </SUI_Segment>
        </SUI_Grid.Column>
      </SUI_Grid>
    );
  }
}

const SigninForm = Antd_Form.create()(Signin_Form);

export default graphql(signinMutation, { name: 'signinMutation' })(
  withRouter(SigninForm)
);
