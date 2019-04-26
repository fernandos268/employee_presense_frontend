import {
  Alert as AntdAlert,
  Card as AntdCard,
  Form as AntdForm,
  message as AntdMessage,
  Spin as AntdSpin,
  Steps as AntdSteps,
} from 'antd';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { Grid as SUI_Grid } from 'semantic-ui-react';
import { isLoggedIn } from '../Auth/Auth';

// GraphQL
import { signupMutation } from '../Graphql/mutations';
import { fetchUsers } from '../Graphql/queries';

// Components
import SignupHeader from './SignupHeader';
import SignupActions from './SignupActions';
import Step1 from './SignupStep1';
import Step2 from './SignupStep2';
import Step3 from './SignupStep3';

const Step = AntdSteps.Step;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      errors: null,
      current: 0,
      confirmDirty: false,
      isLoading: false,

      fieldValues: {
        firstName: '',
        lastName: '',
        suffix: '',
        email: '',
        username: '',
        password: '',
        isAdmin: false,
      },
      errorFields: {
        firstNameError: '',
        lastNameError: '',
        usernameError: '',
        emailError: '',
        passwordError: '',
      },
    };
  }

  componentWillMount() {
    if (isLoggedIn()) this.props.history.replace('/');
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { fieldValues } = this.state;
    if (this.state.current === 2) {
      console.log(this.state.fieldValues);
      this.setState({ isLoading: true });
      const response = await this.props.signupMutation({
        variables: fieldValues,
        refetchQueries: [{ query: fetchUsers }],
      });
      const { ok, errors } = response.data.createUser;
      this.setState({ isLoading: false, errors: errors });
      if (ok) {
        AntdMessage.success('Account has been suceessfully created');
        return this.props.history.replace('/signin');
      }
    } else {
      this.next();
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const { fieldValues, errorFields } = this.state;
    this.setState({
      fieldValues: {
        ...fieldValues,
        [name]: value,
      },
      errorFields: {
        ...errorFields,
        [`${name}Error`]: '',
      },
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  redirectToSignin = () => {
    return this.props.history.replace('/signin');
  };

  next = () => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
    } = this.state.fieldValues;
    let { errorFields, current } = this.state;
    let newErrorFields = {
      ...errorFields,
    };

    if (this.state.current === 0) {
      if (firstName && lastName) {
        current = current + 1;
      }
      newErrorFields.firstNameError = !firstName ? 'error' : '';
      newErrorFields.lastNameError = !lastName ? 'error' : '';
    } else if (this.state.current === 1) {
      if (username && email && password) {
        current = current + 1;
      }
      newErrorFields.usernameError = !username ? 'error' : '';
      newErrorFields.emailError = !email ? 'error' : '';
      newErrorFields.passwordError = !password ? 'error' : '';
    }
    this.setState({
      current: current,
      errorFields: { ...newErrorFields },
    });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current, isLoading, errors, fieldValues, errorFields } = this.state;
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

    let FormItems;
    switch (current) {
      case 0:
        FormItems = (
          <Step1
            handleInputChange={this.handleInputChange}
            fieldValues={fieldValues}
            errorFields={errorFields}
          />
        );
        break;
      case 1:
        FormItems = (
          <Step2
            handleInputChange={this.handleInputChange}
            fieldValues={fieldValues}
            errorFields={errorFields}
          />
        );
        break;
      case 2:
        FormItems = (
          <Step3
            handleInputChange={this.handleInputChange}
            fieldValues={fieldValues}
            errorFields={errorFields}
          />
        );
        break;
      default:
        FormItems = (
          <Step1
            handleInputChange={this.handleInputChange}
            fieldValues={fieldValues}
            errorFields={errorFields}
          />
        );
    }

    return (
      <div style={{ height: '100vh' }}>
        <AntdSpin
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
              <AntdCard
                style={{ boxShadow: '0 8px 32px #aaa' }}
                title={<SignupHeader />}
                actions={[
                  <SignupActions
                    redirectToSignin={this.redirectToSignin}
                    steps={steps}
                    current={current}
                    next={this.next}
                    prev={this.prev}
                  />,
                ]}
              >
                {errors !== null ? (
                  <AntdAlert
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
                  <AntdSteps size="small" current={current}>
                    {steps.map(item => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </AntdSteps>

                  <div className="steps-content">
                    <AntdForm onSubmit={this.handleSubmit}>
                      {FormItems}
                    </AntdForm>
                  </div>
                </div>
              </AntdCard>
              <br />
              <br />
            </SUI_Grid.Column>
          </SUI_Grid>
        </AntdSpin>
      </div>
    );
  }
}

export default compose(
  graphql(signupMutation, { name: 'signupMutation' }),
  graphql(fetchUsers)
)(withRouter(Signup));
