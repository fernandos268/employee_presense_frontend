import React from 'react';

import { Header as SUI_Header, Icon as SUI_Icon } from 'semantic-ui-react';

import { Row as Antd_Row } from 'antd';

export default () => {
  return (
    <Antd_Row type="flex" justify="center">
      <SUI_Header as="h4" icon textAlign="center" color="grey">
        <SUI_Icon name="user" circular />
        <SUI_Header.Content>Sign Up</SUI_Header.Content>
      </SUI_Header>
    </Antd_Row>
  );
};
