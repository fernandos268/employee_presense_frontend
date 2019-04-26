import {
  Button as Antd_Button,
  Form as Antd_Form,
  Icon,
  Input,
  Row as Antd_Row,
} from 'antd';
import React from 'react';

export default props => {
  const { handleSubmit, current } = props;
  return <Antd_Form onSubmit={handleSubmit} />;
};
