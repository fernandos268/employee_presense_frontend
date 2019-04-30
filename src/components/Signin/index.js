import {
  Alert as Antd_Alert,
  Card as Antd_Card,
  message as Antd_Message,
  Spin as Antd_Spin,
  Row as Antd_Row,
} from 'antd';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Grid as SUI_Grid, Segment as SUI_Segment } from 'semantic-ui-react';
// Auth Functions
import { isLoggedIn, setToken } from '../Auth/Auth';
import { signinMutation } from '../Graphql/mutations';
// Components
import SigninForm from './SigninForm';
import SigninHeader from './SigninHeader';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      errors: null,
      email: '',
      password: '',
      isLoading: false,
      age: 0,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    const response = await this.props.signinMutation({
      variables: { email, password },
    });
    const { ok, errors, token } = response.data.signin;
    this.setState({ isLoading: false, errors: errors });

    if (ok) {
      setToken(token);
      Antd_Message.success(`Successfully logged in`);
      return this.props.history.replace('/');
    }
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRedirect = () => {
    return this.props.history.push('/signup');
  };

  componentWillMount() {
    if (isLoggedIn()) this.props.history.replace('/');
  }

  render() {
    const { isLoading, errors } = this.state;
    return (
      <SUI_Grid
        verticalAlign="middle"
        padded
        centered
        style={{ height: '100vh' }}
      >
        <SUI_Grid.Column width={5}>
          <SUI_Segment basic padded>
            <Antd_Card
              style={{ boxShadow: '0 8px 32px #aaa' }}
              title={<SigninHeader />}
              actions={[
                <Antd_Row type="flex" justify="center">
                  <a
                    style={{ size: '24' }}
                    name="signin"
                    onClick={this.handleRedirect}
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
                <SigninForm
                  handleOnChange={this.handleOnChange}
                  handleSubmit={this.handleSubmit}
                />
              </Antd_Spin>
            </Antd_Card>
          </SUI_Segment>
        </SUI_Grid.Column>
      </SUI_Grid>
    );
  }
}

export default graphql(signinMutation, { name: 'signinMutation' })(
  withRouter(Signin)
);
