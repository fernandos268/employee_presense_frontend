import moment from 'moment';
export const TransformTableData = (overtimes = [], tableName) => {
  return overtimes.map(overtime => {
    if (tableName === 'MyTableData') {
      const suffix = overtime.approver.suffix || '';

      return {
        ...overtime,
        key: overtime._id,
        date: moment(overtime.date).format('MM/DD/YYYY'),
        timeWorked: `${overtime.startTime} - ${overtime.endTime}`,
        duration: overtime.duration,
        approver: `${overtime.approver.firstName} ${
          overtime.approver.lastName
        } ${suffix}`,
        status: overtime.status,
      };
    } else if (tableName === 'AssignedTableData') {
      const suffix = overtime.creator.suffix || '';

      return {
        ...overtime,
        key: overtime._id,
        date: moment(overtime.date).format('MM/DD/YYYY'),
        timeWorked: `${overtime.startTime} - ${overtime.endTime}`,
        duration: overtime.duration,
        status: overtime.status,
        name: `${overtime.creator.firstName} ${
          overtime.creator.lastName
        } ${suffix}`,
      };
    }
  });
};
