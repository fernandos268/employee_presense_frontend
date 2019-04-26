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

// status={item.type}

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
  const { createdDayOffs, createdOvertimes, loading } = props;

  let dayOffItems;
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

      const startDate = moment(dayoff.startDate);
      const endDate = moment(dayoff.endDate);

      return {
        inclusiveDates: getDatesBetween(moment(startDate, endDate)).map(
          date => {
            return {
              date: date,
              color,
              content: 'Day Off',
            };
          }
        ),
      };
    });
  }

  let calendarItems = [];
  if (dayOffItems) {
    calendarItems = Object.assign({}, ...dayOffItems);
    console.log(dayOffItems);
    // const calenarItems = dayOffItems.map(inclusiveDate => [...inclusiveDate]);
    console.log(calendarItems);
    // getListData(calendarItems);
  }

  // console.log(
  //   calendarItems.inclusiveDates.map(item => {
  //     return item;
  //   })
  // );

  return <Calendar dateCellRender={dateCellRender} />;
};

export default CalendarVIew;
