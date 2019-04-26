import {
  Button as AntdButton,
  Row as AntdRow,
  Form as AntdForm,
  Icon as AntdIcon,
} from 'antd';
import React from 'react';

export default () => {
  return (
    <div>
      <AntdForm.Item>
        <br />
        <AntdRow type="flex" justify="end">
          <AntdButton
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            block
            size="large"
            shape="round"
          >
            <AntdIcon type="check-circle" />
            Submit
          </AntdButton>
        </AntdRow>
      </AntdForm.Item>
    </div>
  );
};
