import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Segment } from 'semantic-ui-react';

import CalendarView from './CalendarView';

class DayOff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Grid>
        <Grid.Column>
          <Segment>
            <CalendarView />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default DayOff;
