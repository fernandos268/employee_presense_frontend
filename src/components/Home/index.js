import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Segment } from 'semantic-ui-react';

import CalendarView from './CalendarView';

import { graphql, compose } from 'react-apollo';
import { fetchUserData } from '../Graphql/queries';

class DayOff extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const loading = this.props.data.loading
    let createdOvertimes, createdDayOffs;
    if (!loading) {
      createdOvertimes = this.props.data.fetchUser.user.createdOvertimes || [];
      createdDayOffs = this.props.data.fetchUser.user.createdDayOffs || [];
    }

    return (
      <Grid>
        <Grid.Column>
          <Segment raised>
            <CalendarView createdOvertimes={createdOvertimes} createdDayOffs={createdDayOffs} loading={loading} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  graphql(fetchUserData, {
    options: props => ({ variables: { id: props.userId } }),
  })
)(DayOff);
