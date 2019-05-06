import {
  Alert as AntdAlert,
  Card as AntdCard,
  Form as AntdForm,
  message as AntdMessage,
  Spin as AntdSpin,
  Steps as AntdSteps,
} from 'antd';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid as SUI_Grid } from 'semantic-ui-react';
import { isLoggedIn } from '../Auth/Auth';

// Components
import SignupHeader from './SignupHeader';
import SignupActions from './SignupActions';
import Step1 from './SignupStep1';
import Step2 from './SignupStep2';
import Step3 from './SignupStep3';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  requestCreateUser,
  receiveCreateUserResponse,
  receiveCreatedUserSuccess,
} from '../../redux/actions';

const Step = AntdSteps.Step;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      current: 0,
      confirmDirty: false,

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

  componentDidUpdate() {
    if (this.props.data.ok) {
      AntdMessage.success('Account has been suceessfully created');
      this.props.receiveCreatedUserSuccess();
      this.props.history.replace('/signin');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = this.state.fieldValues;
    if (this.state.current === 2) {
      this.props.requestCreateUser(user); // DISPATCH THE CREATE USER ACTION
    } else {
      this.handleStepChange('next');
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

  handleStepChange = buttonAction => {
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
    if (buttonAction === 'cancel') {
      return this.props.history.replace('/signin');
    } else if (buttonAction === 'back') {
      current = this.state.current - 1;
      return this.setState({ current });
    } else if (buttonAction === 'next') {
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
    }
  };

  render() {
    const { current, fieldValues, errorFields } = this.state;

    const { isLoading, errors } = this.props.data;

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
                    steps={steps}
                    current={current}
                    handleStepChange={this.handleStepChange}
                  />,
                ]}
              >
                {errors.length !== 0 ? (
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

const mapStateToProps = state => ({ data: state.UsersReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCreateUser,
      receiveCreateUserResponse,
      receiveCreatedUserSuccess,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Signup));
