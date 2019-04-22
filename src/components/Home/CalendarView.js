import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Segment } from 'semantic-ui-react';

import { Calendar, Badge } from 'antd';
import '../styles/CalendarView.css';
// import DayOffCalendar from './DayOffCalendar';

// FORM COMPONENT

const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }

  return listData || [];
};

const dateCellRender = value => {

  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};


const getDateArray = (start, end) => {
  var arr = new Array();
  var dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }

  return arr;
}

const CalendarVIew = props => {
  const { createdDayOffs, createdOvertimes, loading } = props

  let dayOffItems = []
  if (!loading) {
    dayOffItems = createdDayOffs.map(dayoff => {
      let color = '';
      switch (dayoff.status) {
        case 'Pending':
          color = 'blue';
          break;
        case 'Approved':
          color = 'green';
          break;
        case 'Rejected':
          color = 'red';
          break;
        default:
          color = 'blue';
      }

      const startDate = new Date(dayoff.startDate)
      const endDate = new Date(dayoff.endDate)


      return {
        dates: getDateArray(startDate, endDate),
        color,
        type: "Dayy Off"
      }
    })
  }
  console.log(dayOffItems);


  return (
    <Calendar
      dateCellRender={dateCellRender}
    />
  );
};

export default CalendarVIew;
