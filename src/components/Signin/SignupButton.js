import { Row as Antd_Row } from 'antd';
import React from 'react';

export default ({ handleRedirect }) => {
  return (
    <Antd_Row type="flex" justify="center">
      <a style={{ size: '24' }} name="signin" onClick={handleRedirect}>
        Sign up here
      </a>
    </Antd_Row>
  );
};
