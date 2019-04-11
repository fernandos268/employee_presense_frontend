import React from 'react';

import { Calendar } from 'antd';
import '../styles/AntCalendar.css';
import { Segment } from 'semantic-ui-react';

const onPanelChange = (value, mode) => {
  console.log(value, mode);
};

const DayOffCalendar = () => {
  return <Calendar onPanelChange={onPanelChange} />;
};

export default DayOffCalendar;
