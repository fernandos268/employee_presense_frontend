import React from 'react';

import {
  Form as Antd_Form,
  Icon as Antd_Icon,
  Input as Antd_Input,
  Button as Antd_Button,
} from 'antd';

export default props => {
  const { handleSubmit, handleOnChange } = props;

  return (
    <Antd_Form onSubmit={handleSubmit}>
      <Antd_Form.Item>
        <Antd_Input
          size="large"
          prefix={
            <Antd_Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
          }
          placeholder="Email Address"
          name="email"
          onChange={handleOnChange}
        />
      </Antd_Form.Item>
      <Antd_Form.Item>
        <Antd_Input.Password
          size="large"
          prefix={
            <Antd_Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
          }
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleOnChange}
        />
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
  );
};
