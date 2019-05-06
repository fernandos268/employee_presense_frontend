import React, { Component } from 'react';
import {
  Alert as Antd_Alert,
  Card as Antd_Card,
  message as Antd_Message,
  Spin as Antd_Spin,
  Row as Antd_Row,
} from 'antd';

import { withRouter } from 'react-router-dom';
import { Grid as SUI_Grid, Segment as SUI_Segment } from 'semantic-ui-react';
// Auth Functions
import { isLoggedIn, setToken } from '../Auth/Auth';
// Components
import SigninForm from './SigninForm';
import SigninHeader from './SigninHeader';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestSignin,
  receiveSigninResponse,
  resetSigninErrors,
} from '../../redux/actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      email: '',
      password: '',
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.requestSignin({ email, password });
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRedirect = () => {
    this.props.resetSigninErrors();
    return this.props.history.push('/signup');
  };

  componentWillMount() {
    if (isLoggedIn()) this.props.history.replace('/');
  }

  componentDidUpdate() {
    const { ok, token } = this.props.data;
    if (ok) {
      setToken(token);
      Antd_Message.success(`Successfully logged in`);
      this.props.history.replace('/');
      this.props.resetSigninErrors();
    }
  }

  render() {
    const { isLoading, errors } = this.props.data;

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
              {errors.length !== 0 ? (
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

const mapStateToProps = state => ({ data: state.UsersReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestSignin,
      receiveSigninResponse,
      resetSigninErrors,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signin));
