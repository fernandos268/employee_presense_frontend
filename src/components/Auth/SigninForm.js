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
  Alert as Antd_Alert,
  message as Antd_Message,
  Spin as Antd_Spin,
  Row as Antd_Row,
  Card as Antd_Card,
} from 'antd';

import { withRouter } from 'react-router-dom';

// Auth

import { isLoggedIn, setToken } from './Auth';

class Signin_Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      errors: null,
      isLoading: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ isLoading: true });
        await this.props
          .signinMutation({
            variables: values,
          })
          .then(response => {
            const { ok, errors, token } = response.data.signin;
            this.setState({ isLoading: false, errors: errors });

            if (ok) {
              setToken(token);
              Antd_Message.success(`Successfully logged in`);
              this.props.history.replace('/');
            }

          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  componentWillMount() {
    if (isLoggedIn()) this.props.history.replace('/');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading, errors } = this.state;

    return (
      <SUI_Grid verticalAlign="middle" padded centered style={{ height: '100vh' }}>
        <SUI_Grid.Column width={5}>
          <SUI_Segment basic padded>
            <Antd_Card
              style={{ boxShadow: '0 8px 32px #aaa' }}
              title={
                <Antd_Row type="flex" justify="center">
                  <SUI_Header as="h4" icon textAlign="center" color="grey">
                    <SUI_Icon name="user" circular />
                    <SUI_Header.Content>Sign in</SUI_Header.Content>
                  </SUI_Header>
                </Antd_Row>
              }
              actions={[
                <Antd_Row type="flex" justify="center">
                  <a
                    style={{ size: '24' }}
                    name="signin"
                    onClick={e => {
                      this.props.history.push('/signup');
                    }}
                  >
                    Sign up here
                </a>
                </Antd_Row>,
              ]}
            >
              {errors !== null ? (
                <Antd_Alert
                  message="Error"
                  description={errors.map(error => {
                    return `${error.message} \n`;
                  })}
                  type="error"
                  showIcon
                />
              ) : null}
              <br />
              <Antd_Spin tip="Checking..." spinning={isLoading}>
                <Antd_Form onSubmit={this.handleSubmit} >
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
                      <Antd_Input.Password
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
              </Antd_Spin>
            </Antd_Card>
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
