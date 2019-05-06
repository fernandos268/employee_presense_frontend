import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Segment } from 'semantic-ui-react';

import { Calendar, Badge } from 'antd';
import '../styles/CalendarView.css';
import { object } from 'prop-types';
// import DayOffCalendar from './DayOffCalendar';

// FORM COMPONENT

const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [{ type: 'success', content: 'Approved' }];
      break;
    case 10:
      listData = [
        { type: 'success', content: 'approved' },
        { type: 'error', content: 'Rejected' },
      ];
      break;
    case 15:
      listData = [{ type: 'error', content: 'Rejected' }];
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

const getDatesBetween = (start, end, datesArray = []) => {
  if (start.isSameOrBefore(end)) {
    const isWeekday = start.day() === 0 || start.day() === 6;
    if (!isWeekday) {
      datesArray.push(start._d);
    }
    return getDatesBetween(start.clone().add(1, 'day'), end, datesArray);
  }
  return datesArray;
};

const CalendarVIew = props => {
  const { createdDayOffs, createdOvertimes, isLoading } = props;

  const formattedOvertimes = createdOvertimes.map(overtime => {
    return {
      key: overtime._id,
      date: moment(overtime.date),
      status: overtime.status,
      text: `${overtime.startTime} - ${overtime.endTime}`,
    };
  });

  return <Calendar dateCellRender={dateCellRender} />;
};

export default CalendarVIew;
