import moment from 'moment';

export default (Dayoffs = [], tableName) => {
  return Dayoffs.map(dayoff => {
    if (tableName === 'MyTableData') {
      const suffix = dayoff.approver.suffix || '';
      return {
        ...dayoff,
        key: dayoff._id,
        startDate: moment(dayoff.startDate).format('MM/DD/YYYY'),
        endDate: moment(dayoff.endDate).format('MM/DD/YYYY'),
        approver: `${dayoff.approver.firstName} ${
          dayoff.approver.lastName
        } ${suffix}`,
      };
    } else if (tableName === 'AssignedTableData') {
      const suffix = dayoff.creator.suffix || '';
      return {
        ...dayoff,
        key: dayoff._id,
        startDate: moment(dayoff.startDate).format('MM/DD/YYYY'),
        endDate: moment(dayoff.endDate).format('MM/DD/YYYY'),
        name: `${dayoff.creator.firstName} ${
          dayoff.creator.lastName
        } ${suffix}`,
      };
    }
  });
};
