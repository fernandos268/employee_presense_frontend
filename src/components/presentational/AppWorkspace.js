import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid, Segment, Container } from 'semantic-ui-react';

const Overtime = () => <h1>OVERTIME</h1>;
const Leave = () => <h1>Leave</h1>;
const Statistics = () => <h1>Statistics</h1>;

const AppWorkspace = () => (
  <Container fluid style={{ height: '88%' }}>
    <Segment basic padded style={{ height: '100%' }}>
      <Segment style={{ height: '100%' }}>
        <Switch>
          <Route path="overtime" Component={Overtime} />
          <Route path="leave" Component={Leave} />
          <Route path="statistics" Component={Statistics} />
        </Switch>
      </Segment>
    </Segment>
  </Container>
);

export default AppWorkspace;
