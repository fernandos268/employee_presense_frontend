import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Segment } from 'semantic-ui-react';

import { Spin as AntdSpin } from 'antd';

import CalendarView from './CalendarView';

import { graphql, compose } from 'react-apollo';
import { fetchUserData } from '../Graphql/queries';

// Redux functions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestCurrentUserData } from '../../redux/actions';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const isLoading = this.props.data.isLoading;

    const createdOvertimes = this.props.data.userData.createdOvertimes || [];
    const createdDayOffs = this.props.data.userData.createdDayOffs || [];

    return (
      <AntdSpin
        tip="Fetching data..."
        spinning={isLoading}
        style={{ height: '100%' }}
      >
        <Grid>
          <Grid.Column>
            <Segment raised>
              <CalendarView
                createdOvertimes={createdOvertimes}
                createdDayOffs={createdDayOffs}
                loading={isLoading}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </AntdSpin>
    );
  }
}

// export default compose(
//   graphql(fetchUserData, {
//     options: props => ({ variables: { id: props.userId } }),
//   })
// )(Home);

const mapStateToProps = state => ({ data: state.UsersReducer });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestCurrentUserData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
