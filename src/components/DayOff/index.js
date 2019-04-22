import React, { Component, createRef } from 'react';

import moment from 'moment';

// GraphQL
import { graphql, compose } from 'react-apollo';
import {
  createDayOffMutation,
  deleteDayOffMutation,
  updateDayOffMutation,
} from '../Graphql/mutations';
import { fetchUserData } from '../Graphql/queries';

// External Library Components Imports --------------------
import {
  Grid as SUI_Grid,
  Segment as SUI_Segment,
  Header as SUI_Header,
} from 'semantic-ui-react';
import {
  Table as Antd_Table,
  Tag as Antd_Tag,
  Row as Antd_Row,
  Button as Antd_Button,
  message as Antd_Message,
  Icon as Antd_Icon,
  Spin as Antd_Spin,
  Modal as Antd_Modal,
  Select as Antd_Select,
  Divider as Antd_Divider,
  Tooltip as Antd_Tooltip,
} from 'antd';

// Component Imports -------------------------------------
import DayOffForm from './DayOffForm';

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

  handleOnValueChange = (props, changedValues, allValues) => {
    const form = this.formRef;

    if (allValues.startDate && allValues.endDate) {
      const start = moment(allValues.startDate._d);
      const end = moment(allValues.endDate._d);

      const calcDuration = moment.duration(end.diff(start));
      const duration = `${Number(calcDuration._data.days) + 1} Day(s)`;
      if (calcDuration._data.days > 0) {
        form.setFields({ duration: { value: duration } });
      } else {
        Antd_Message.error(`Negative duration is not allowed`);
        form.setFields({
          duration: {
            value: '',
            errors: [
              {
                required: true,
                message: 'Please select the date',
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
        console.log(values);
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
        console.log(response);
        if (errors) {
          Antd_Message.error(errors.message);
        }

        if (ok) {
          Antd_Message.success('New entry has been added');
          this.onFormClose();
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
        await this.props
          .deleteDayOffMutation({
            variables: {
              id: record._id,
            },
            refetchQueries: [
              { query: fetchUserData, variables: { id: this.props.userId } },
            ],
          })
          .then(response => {
            const { ok, errors } = response.data.deleteDayOff;
            if (errors) {
              Antd_Message.error(errors.message);
            }
            if (ok) {
              Antd_Message.success('Entry has been deleted');
            }
          });
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
        await this.props
          .updateDayOffMutation({
            variables: {
              id: record._id,
              status: status,
            },
            refetchQueries: [
              { query: fetchUserData, variables: { id: this.props.userId } },
            ],
          })
          .then(response => {
            const { ok, errors } = response.data.updateDayOff;

            console.log(response.data.updateDayOff);

            if (errors) {
              Antd_Message.error(errors.message);
            }
            if (ok) {
              Antd_Message.success(`Entry has been ${status}`);
            }
          });
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
    const { formVisible } = this.state;
    const { loading } = this.props.data;

    const { users } = this.props;

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

    let MyTableData, MyTableDataTotal, AssignedTableData, AssignedTableDataTotal = 0;
    // console.log(this.props);
    if (!loading) {
      const createdDayOffs =
        this.props.data.fetchUser.user.createdDayOffs || [];
      if (createdDayOffs) {
        MyTableData = createdDayOffs.map(dayoff => {
          const suffix = dayoff.approver.suffix || '';
          return {
            ...dayoff,
            key: dayoff._id,
            startDate: moment(dayoff.startDate, 'x').format('MM/DD/YYYY'),
            endDate: moment(dayoff.endDate, 'x').format('MM/DD/YYYY'),
            approver: `${dayoff.approver.firstName} ${
              dayoff.approver.lastName
              } ${suffix}`,
          };
        });
        MyTableDataTotal = MyTableData.length
      }


      const assignedDayoffs =
        this.props.data.fetchUser.user.assignedDayOffs || [];
      if (assignedDayoffs) {
        AssignedTableData = assignedDayoffs.map(assignedDayoff => {
          const suffix = assignedDayoff.creator.suffix || '';
          return {
            ...assignedDayoff,
            key: assignedDayoff._id,
            startDate: moment(assignedDayoff.startDate, 'x').format(
              'MM/DD/YYYY'
            ),
            endDate: moment(assignedDayoff.endDate, 'x').format('MM/DD/YYYY'),
            name: `${assignedDayoff.creator.firstName} ${
              assignedDayoff.creator.lastName
              } ${suffix}`,
          };
        });
        AssignedTableDataTotal = AssignedTableData.length
      }
    }

    const MyTableColumns = [
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center',
      },
      {
        title: 'End Date ',
        dataIndex: 'endDate',
        key: 'endDate',
        align: 'center',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        align: 'center',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Approver',
        dataIndex: 'approver',
        key: 'approver',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        render: status => {
          let color = '';
          switch (status) {
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
          return (
            <span>
              <Antd_Tag color={color}>{status.toUpperCase()}</Antd_Tag>
            </span>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            <Antd_Tooltip placement="left" title="Delete">
              <Antd_Button
                shape="circle"
                type="danger"
                ghost
                icon="delete"
                onClick={this.handleDelete.bind(this, record)}
              />
            </Antd_Tooltip>
          </span>
        ),
      },
    ];

    const MyApprovalColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center',
      },
      {
        title: 'End Date ',
        dataIndex: 'endDate',
        key: 'endDate',
        align: 'center',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        align: 'center',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        render: status => {
          let color = '';
          switch (status) {
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
          return (
            <span>
              <Antd_Tag color={color}>{status.toUpperCase()}</Antd_Tag>
            </span>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        colSpan: 1,
        align: 'center',
        render: (text, record) => {
          let color = '';
          switch (record.status) {
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
          if (record.status === 'Pending' || record.status === 'Rejected') {
            return (
              <span>
                <Antd_Tooltip placement="left" title="Approve">
                  <Antd_Button
                    shape="circle"
                    icon="like"
                    type="primary"
                    ghost
                    onClick={this.handleApproveReject.bind(
                      this,
                      record,
                      'Approved'
                    )}
                  />
                </Antd_Tooltip>
                <Antd_Divider type="vertical" />
                <Antd_Tooltip placement="left" title="Reject">
                  <Antd_Button
                    shape="circle"
                    icon="dislike"
                    type="danger"
                    ghost
                    onClick={this.handleApproveReject.bind(
                      this,
                      record,
                      'Rejected'
                    )}
                  />
                </Antd_Tooltip>
              </span>
            );
          }
          return <label>N/A</label>;
        },
      },
    ];

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
                    columns={MyTableColumns}
                    dataSource={MyTableData}
                    size="small"
                    pagination={{ defaultPageSize: 5, total: MyTableDataTotal }}
                  />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
            <Antd_Divider />
            {AssignedTableDataTotal > 0 ? (<SUI_Grid columns="equal" verticalAlign="middle">
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
                    columns={MyApprovalColumns}
                    dataSource={AssignedTableData}
                    size="small"
                    pagination={{ defaultPageSize: 5, total: AssignedTableDataTotal }}
                  />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>) : null}
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
