import React from 'react';

import { Grid, Segment } from 'semantic-ui-react';

import DayOffCalendar from './DayOffCalendar';

const LeaveContainer = () => {
  return (
    <Grid>
      <Grid.Column>
        <DayOffCalendar />
      </Grid.Column>
    </Grid>
  );
};

export default LeaveContainer;
