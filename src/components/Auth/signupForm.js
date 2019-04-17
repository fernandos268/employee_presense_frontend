import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { signupMutation } from '../Graphql/mutations';

import jwtDecode from 'jwt-decode';

import { withRouter } from 'react-router-dom';
import {
  Form,
  Icon,
  Input,
  Steps,
  Button,
  message as Antd_Message,
  Checkbox,
  Spin as Antd_Spin,
  Row as Antd_Row,
  Card as Antd_Card,
  Alert as Antd_Alert,
} from 'antd';
import {
  Header as SUI_Header,
  Icon as SUI_Icon,
  Grid as SUI_Grid,
} from 'semantic-ui-react';

const Step = Steps.Step;

const FormItem = Form.Item;

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      errors: null,
      current: 0,
      confirmDirty: false,
      isLoading: false,
      validationErrors: [],
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.current === 2) {
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          this.setState({ isLoading: true });
          await this.props
            .signupMutation({
              variables: {
                firstName: values.firstName,
                lastName: values.lastName,
                suffix: values.suffix,
                email: values.email,
                username: values.username,
                password: values.password,
                isAdmin: false,
              },
            })
            .then(response => {
              const { ok, errors } = response.data.createUser;

              this.setState({ isLoading: false, errors: errors });

              if (ok) {
                Antd_Message.success('Account has been suceessfully created');
                this.props.history.replace('/signin');
              }

              console.log(response);
            });
        }
      });
    } else {
      this.next();
    }
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  componentWillMount() {
    // if (isLoggedIn()) this.props.history.replace('/');
  }

  next = () => {
    if (this.state.current === 0) {
      const fields = ['firstName', 'lastName'];
      this.props.form.validateFields(fields, async err => {
        if (!err) {
          const current = this.state.current + 1;
          this.setState({ current });
        }
      });
    } else if (this.state.current === 1) {
      const fields = ['username', 'email', 'password', 'confirmPassword'];
      this.props.form.validateFields(fields, async err => {
        if (!err) {
          const current = this.state.current + 1;
          this.setState({ current });
        }
      });
    }
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    // Only show error after a field is touched.

    const { errors, formLayout, formItemSize } = this.state;

    const { current, isLoading } = this.state;

    const steps = [
      {
        title: 'Personal',
      },
      {
        title: 'Account',
      },
      {
        title: 'Submit',
      },
    ];

    return (
      <div style={{ height: '100vh' }}>
        <Antd_Spin
          tip="Submitting..."
          spinning={isLoading}
          style={{ height: '100%' }}
        >
          <SUI_Grid
            verticalAlign="middle"
            centered
            style={{
              height: '100%',
              overflow: 'auto',
            }}
          >
            <SUI_Grid.Column width={5} style={{ height: '100%' }}>
              <br />
              <br />
              <br />
              <Antd_Card
                style={{ boxShadow: '0 8px 32px #aaa' }}
                title={
                  <Antd_Row type="flex" justify="center">
                    <SUI_Header as="h4" icon textAlign="center" color="grey">
                      <SUI_Icon name="user" circular />
                      <SUI_Header.Content>Signup Form</SUI_Header.Content>
                    </SUI_Header>
                  </Antd_Row>
                }
                actions={[
                  <div className="steps-action">
                    <Button.Group size="large">
                      {this.state.current === 0 ? (
                        <Button
                          type="primary"
                          onClick={() => {
                            this.props.history.replace('/signin');
                          }}
                        >
                          <Icon type="left" />
                          Cancel
                        </Button>
                      ) : null}

                      {this.state.current > 0 && (
                        <Button type="primary" onClick={() => this.prev()}>
                          <Icon type="left" />
                          Back
                        </Button>
                      )}
                      {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                          Next
                          <Icon type="right" />
                        </Button>
                      )}

                      {this.state.current === 2 ? (
                        <Button
                          type="danger"
                          onClick={() => {
                            this.props.history.replace('/signin');
                          }}
                        >
                          Cancel
                        </Button>
                      ) : null}
                    </Button.Group>
                  </div>,
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
                <div>
                  <Steps size="small" current={current}>
                    {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>

                  <div className="steps-content">
                    <Form onSubmit={this.handleSubmit}>
                      <div
                        style={{
                          display: this.state.current === 0 ? 'block' : 'none',
                        }}
                      >
                        <br />
                        <FormItem label="First Name">
                          {getFieldDecorator('firstName', {
                            rules: [
                              {
                                required: true,
                                message: 'This field is required!',
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              size={formItemSize}
                              placeholder="Enter your first name here"
                            />
                          )}
                        </FormItem>
                        <FormItem label="Last Name">
                          {getFieldDecorator('lastName', {
                            rules: [
                              {
                                required: true,
                                message: 'This field is required!',
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              size={formItemSize}
                              placeholder="Enter your last name here"
                            />
                          )}
                        </FormItem>
                        <FormItem label="Suffix">
                          {getFieldDecorator('suffix', {
                            rules: [
                              {
                                required: false,
                                message: 'This field is required!',
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              size={formItemSize}
                              placeholder="Enter your suffix here e.g. Jr, II, III"
                            />
                          )}
                        </FormItem>
                      </div>

                      <div
                        style={{
                          display: this.state.current === 1 ? 'block' : 'none',
                        }}
                      >
                        <br />
                        <FormItem label="Username">
                          {getFieldDecorator('username', {
                            rules: [
                              {
                                required: true,
                                message: 'This field is required!',
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="user"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              size={formItemSize}
                              placeholder="Enter your username name here"
                            />
                          )}
                        </FormItem>
                        <FormItem label="Email Address" hasFeedback>
                          {getFieldDecorator('email', {
                            rules: [
                              {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                              },
                              {
                                required: true,
                                message: 'This field is required!',
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="mail"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              size={formItemSize}
                              placeholder="Enter your email address here"
                            />
                          )}
                        </FormItem>
                        <FormItem label="Password" hasFeedback>
                          {getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: 'This field is required!',
                              },
                              {
                                validator: this.validateToNextPassword,
                              },
                              {
                                min: 6,
                              },
                              {
                                max: 30,
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="lock"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              type="password"
                              placeholder="Enter your password here"
                            />
                          )}
                        </FormItem>
                        <FormItem label="Confirm Password" hasFeedback>
                          {getFieldDecorator('confirmPassword', {
                            rules: [
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },
                              {
                                validator: this.compareToFirstPassword,
                              },
                            ],
                          })(
                            <Input
                              size="large"
                              prefix={
                                <Icon
                                  type="lock"
                                  style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                              }
                              type="password"
                              onBlur={this.handleConfirmBlur}
                              placeholder="Cofirm password"
                            />
                          )}
                        </FormItem>
                      </div>

                      <div
                        style={{
                          display: this.state.current === 2 ? 'block' : 'none',
                        }}
                      >
                        <br />
                        <Form.Item>
                          <br />
                          <Antd_Row type="flex" justify="end">
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="login-form-button"
                              size="large"
                              block
                              size="large"
                              shape="round"
                            >
                              <Icon type="check-circle" />
                              Submit
                            </Button>
                          </Antd_Row>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </Antd_Card>
              <br />
              <br />
            </SUI_Grid.Column>
          </SUI_Grid>
        </Antd_Spin>
      </div>
    );
  }
}

const SignupForm = Form.create()(RegisterForm);

export default graphql(signupMutation, { name: 'signupMutation' })(
  withRouter(SignupForm)
);
