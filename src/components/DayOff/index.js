import {
  Button as Antd_Button,
  Divider as Antd_Divider,
  message as Antd_Message,
  Modal as Antd_Modal,
  Row as Antd_Row,
  Select as Antd_Select,
  Spin as Antd_Spin,
  Table as Antd_Table,
} from 'antd';
import moment from 'moment';
import React, { Component } from 'react';

// GraphQL
import { compose, graphql } from 'react-apollo';

// External Library Components Imports --------------------
import {
  Grid as SUI_Grid,
  Header as SUI_Header,
  Segment as SUI_Segment,
} from 'semantic-ui-react';
import {
  createDayOffMutation,
  deleteDayOffMutation,
  updateDayOffMutation,
} from '../Graphql/mutations';
import { fetchUserData } from '../Graphql/queries';

// Component Imports -------------------------------------
import DayOffForm from './DayOffForm';
import { MyApprovalColumns, MytableColumns } from './DayoffTableColumns';
import TransformTableData from './TransformTableData';

class DayOff extends Component {
  constructor() {
    super();
    this.state = { isLoading: false };
  }

  showForm = () => {
    this.setState({
      formVisible: true,
    });
  };

  getDateDifference = (start, end, datesArray = []) => {
    if (start.isSameOrBefore(end)) {
      const isWeekday = start.day() === 0 || start.day() === 6;
      if (!isWeekday) {
        datesArray.push(start._d);
      }
      return this.getDateDifference(
        start.clone().add(1, 'day'),
        end,
        datesArray
      );
    }
    return datesArray;
  };

  handleOnValueChange = (props, changedValues, allValues) => {
    const form = this.formRef;

    if (allValues.startDate && allValues.endDate) {
      const start = moment(allValues.startDate._d);
      const end = moment(allValues.endDate._d);

      const calcDuration = moment.duration(end.diff(start));
      // console.log(this.getDateDifference(start, end));

      const duration = this.getDateDifference(start, end).length;
      const durationText = `${
        this.getDateDifference(start, end).length
      } Day(s)`;

      if (duration > 0) {
        form.setFields({ duration: { value: durationText } });
      } else {
        Antd_Message.error(`Negative duration is not allowed`);
        form.setFields({
          duration: {
            value: '',
            errors: [
              {
                required: true,
                message: 'Please select a proper date range',
              },
            ],
          },
        });
      }
    }
  };

  handleSubmit = () => {
    const form = this.formRef;
    form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        // Should format date value before submit.
        this.setState({ isLoading: true });
        const values = {
          ...fieldsValue,
        };
        const response = await this.props.createDayOffMutation({
          variables: {
            startDate: values.startDate,
            endDate: values.endDate,
            duration: values.duration,
            description: values.description,
            status: 'Pending',
            approverId: values.approver,
          },
          refetchQueries: [
            { query: fetchUserData, variables: { id: this.props.userId } },
          ],
        });
        const { ok, errors } = response.data.createDayOff;
        this.setState({ isLoading: false, errors: errors });

        if (errors) {
          return Antd_Message.error(errors.message);
        }

        if (ok) {
          Antd_Message.success('New entry has been added');
          return this.onFormClose();
        }
      }
    });
  };

  handleDelete = record => {
    Antd_Modal.confirm({
      title: 'Are you sure you want to delete this entry?',
      okText: 'Yes',
      okType: 'danger',
      centered: true,
      onOk: async () => {
        const response = await this.props.deleteDayOffMutation({
          variables: {
            id: record._id,
          },
          refetchQueries: [
            { query: fetchUserData, variables: { id: this.props.userId } },
          ],
        });
        const { ok, errors } = response.data.deleteDayOff;
        if (errors) {
          return Antd_Message.error(errors.message);
        }
        if (ok) {
          return Antd_Message.success('Entry has been deleted');
        }
      },
    });
  };

  handleApproveReject = (record, status) => {
    const question = status === 'Approved' ? 'Approve' : 'Reject';
    Antd_Modal.confirm({
      title: `${question} this Dayoff entry?`,
      okText: 'Yes',
      okType: 'primary',
      centered: true,
      onOk: async () => {
        const response = await this.props.updateDayOffMutation({
          variables: {
            id: record._id,
            status: status,
          },
          refetchQueries: [
            { query: fetchUserData, variables: { id: this.props.userId } },
          ],
        });
        const { ok, errors } = response.data.updateDayOff;
        if (errors) {
          return Antd_Message.error(errors.message);
        }
        if (ok) {
          return Antd_Message.success(`Entry has been ${status}`);
        }
      },
    });
  };

  onFormClose = () => {
    const form = this.formRef;
    form.resetFields();
    this.setState({
      formVisible: false,
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    let { formVisible } = this.state;
    const { loading } = this.props.data;
    const { users, data } = this.props;

    let MyDayoffs,
      MyAssignedDayoffs = [];

    // TRANSFORM USERS TO BE POPULATED IN APPROVERS DROPDOWN
    let ApproverOptions;
    if (users) {
      ApproverOptions = users.map(user => {
        const suffix = user.suffix || '';
        return (
          <Antd_Select.Option key={user._id}>{`${user.firstName} ${
            user.lastName
          } ${suffix}`}</Antd_Select.Option>
        );
      });
    }

    if (!loading) {
      MyDayoffs = TransformTableData(
        this.props.data.fetchUser.user.createdDayOffs,
        'MyTableData'
      );

      MyAssignedDayoffs = TransformTableData(
        this.props.data.fetchUser.user.assignedDayOffs,
        'AssignedTableData'
      );
    }

    return (
      <div
        style={{ height: '100%' }}
        ref={divElement => (this.divElement = divElement)}
      >
        <Antd_Spin
          tip="Fetching data..."
          spinning={loading}
          style={{ height: '100%' }}
        >
          <SUI_Segment raised>
            <SUI_Grid columns="equal" verticalAlign="middle">
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <SUI_Header as="h3" color="grey">
                    <SUI_Header.Content>My Day Off List :</SUI_Header.Content>
                  </SUI_Header>
                </SUI_Grid.Column>
                <SUI_Grid.Column>
                  <Antd_Row type="flex" justify="end">
                    <Antd_Button
                      type="primary"
                      icon="plus"
                      onClick={this.showForm}
                    >
                      New Entry
                    </Antd_Button>
                  </Antd_Row>
                </SUI_Grid.Column>
              </SUI_Grid.Row>
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <Antd_Table
                    bordered
                    columns={MytableColumns(this.handleDelete)}
                    dataSource={MyDayoffs}
                    size="small"
                  />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
            <Antd_Divider />
            <SUI_Grid columns="equal" verticalAlign="middle">
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <SUI_Header as="h3" color="grey">
                    <SUI_Header.Content>For My Approval :</SUI_Header.Content>
                  </SUI_Header>
                </SUI_Grid.Column>
              </SUI_Grid.Row>
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <Antd_Table
                    bordered
                    columns={MyApprovalColumns(this.handleApproveReject)}
                    dataSource={MyAssignedDayoffs}
                    size="small"
                  />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
          </SUI_Segment>
          <DayOffForm
            formVisible={formVisible}
            onFormClose={this.onFormClose}
            handleSubmit={this.handleSubmit}
            ref={this.saveFormRef}
            handleOnValueChange={this.handleOnValueChange}
            ApproverOptions={ApproverOptions}
            isLoading={this.state.isLoading}
          />
        </Antd_Spin>
      </div>
    );
  }
}

export default compose(
  graphql(createDayOffMutation, { name: 'createDayOffMutation' }),
  graphql(deleteDayOffMutation, { name: 'deleteDayOffMutation' }),
  graphql(updateDayOffMutation, { name: 'updateDayOffMutation' }),
  graphql(fetchUserData, {
    options: props => ({ variables: { id: props.userId } }),
  })
)(DayOff);
