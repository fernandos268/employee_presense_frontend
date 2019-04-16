import React from 'react';
import propTypes from 'prop-types';
import { Modal, Button } from 'antd';

const DayoffEntryFOrm = props => {
  return (
    <Modal title="Basic Modal" visible={props.visible}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

DayoffEntryFOrm.propTypes = {
  isVIsible: propTypes.bool,
};

export default DayoffEntryFOrm;
