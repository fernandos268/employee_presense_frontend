import { Input as AntdInput, Form as AntdForm, Icon as AntdIcon } from 'antd';
import React from 'react';

export default props => {
  const {
    handleInputChange,
    handleConfirmBlur,
    fieldValues,
    errorFields,
  } = props;
  const { email, username, password } = fieldValues;
  const { emailError, usernameError, passwordError } = errorFields;
  return (
    <div>
      <br />
      <AntdForm.Item
        label="Username"
        validateStatus={usernameError}
        help={usernameError ? 'This field is required.' : null}
        required
      >
        <AntdInput
          value={username}
          name="username"
          size="large"
          prefix={<AntdIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Enter your username name here"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
      <AntdForm.Item
        label="Email Address"
        validateStatus={emailError}
        help={emailError ? 'This field is required.' : null}
        required
      >
        <AntdInput
          value={email}
          name="email"
          size="large"
          prefix={<AntdIcon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Enter your email address here"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
      <AntdForm.Item
        label="Password"
        validateStatus={passwordError}
        help={passwordError ? 'This field is required.' : null}
        required
      >
        <AntdInput
          value={password}
          name="password"
          size="large"
          prefix={<AntdIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Enter your password here"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
    </div>
  );
};
