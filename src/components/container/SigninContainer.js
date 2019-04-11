import React from 'react';

import { Grid, Segment, Button, Checkbox, Form } from 'semantic-ui-react';

const SigninContainer = () => {
  return (
    <Grid verticalAlign="middle" centered style={{ height: '100vh' }}>
      <Grid.Column width={6}>
        <Segment basic padded style={{ height: '100%' }}>
          <Segment color="blue" raised>
            <Form size="large">
              <Form.Field>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
              </Form.Field>
              <Grid>
                <Grid.Column>
                  <Button primary size="large" floated="right">
                    Sign in
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          </Segment>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default SigninContainer;
