import { Input as AntdInput, Form as AntdForm, Icon as AntdIcon } from 'antd';
import React from 'react';
export default props => {
  const { handleInputChange, fieldValues, errorFields } = props;
  const { firstName, lastName, suffix } = fieldValues;
  const { firstNameError, lastNameError } = errorFields;
  return (
    <div>
      <br />
      <AntdForm.Item
        label="First Name"
        validateStatus={firstNameError}
        help={firstNameError ? 'This field is required.' : null}
        required
      >
        <AntdInput
          value={firstName}
          name="firstName"
          size="large"
          prefix={<AntdIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Enter your first name here"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
      <AntdForm.Item
        label="Last Name"
        validateStatus={lastNameError}
        help={lastNameError ? 'This field is required.' : null}
        required
      >
        <AntdInput
          value={lastName}
          name="lastName"
          size="large"
          prefix={<AntdIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Enter your last name here"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
      <AntdForm.Item label="Suffix">
        <AntdInput
          value={suffix}
          name="suffix"
          size="large"
          prefix={<AntdIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Enter your suffix here e.g. Jr, II, III"
          onChange={handleInputChange}
        />
      </AntdForm.Item>
    </div>
  );
};
