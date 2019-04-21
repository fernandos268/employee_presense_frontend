import React, { Component, createRef } from 'react';

import moment from 'moment'

// GraphQL 
import { graphql, compose } from 'react-apollo';
import { createOvertimeMutation, deleteOvertimeMutation } from '../Graphql/mutations'
import { fetchOvertimes } from '../Graphql/queries'

// External Library Components Imports --------------------
import {
  Grid as SUI_Grid,
  Segment as SUI_Segment,
  Header as SUI_Header,
} from 'semantic-ui-react'
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
  Tooltip as Antd_Tooltip
} from 'antd';

// Component Imports -------------------------------------
import OvertimeForm from './OvertimeForm'

class Overtime extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef()
    this.state = {
      duration: "",
      formVisible: false,
      containerWidth: 0,
      isLoading: false
    };
  }

  showForm = () => {
    this.setState({
      formVisible: true,
    });
  }

  onFormClose = () => {
    const form = this.formRef;
    form.resetFields()
    this.setState({
      formVisible: false,
    });
  }

  handleOnValueChange = (props, changedValues, allValues) => {
    const form = this.formRef;

    if (allValues.timeEnded && allValues.timeStarted) {

      const start = moment(allValues.timeStarted._d, 'YYYY-MM-DD HH:mm:ss')
      const end = moment(allValues.timeEnded._d, 'YYYY-MM-DD HH:mm:ss')

      const calcDuration = moment.duration(end.diff(start));
      const duration = `${calcDuration._data.hours} Hr & ${calcDuration._data.minutes} Min`

      if (calcDuration._milliseconds > 0) {
        // return this.setState({ duration })
        form.setFields({ duration: { value: duration } })
      } else {
        Antd_Message.error(`Negative duration is not allowed`);
        form.setFields({
          duration: {
            value: "", errors: [{
              required: true,
              message: 'Please select the date',
            }]
          }
        })
      }
    }
  }


  handleSubmit = () => {
    const form = this.formRef;
    form.validateFields(async (err, fieldsValue) => {
      if (!err) {
        // Should format date value before submit.
        this.setState({ isLoading: true });
        const values = {
          ...fieldsValue,
          'timeStarted': fieldsValue['timeStarted'].format('HH:mm'),
          'timeEnded': fieldsValue['timeEnded'].format('HH:mm'),
        };
        console.log(values);
        await this.props
          .createOvertimeMutation({
            variables: {
              date: values.date.toISOString(),
              startTime: values.timeStarted,
              endTime: values.timeEnded,
              duration: values.duration,
              description: values.description,
              status: 'Pending',
              approverId: values.approver
            },
            refetchQueries: [{ query: fetchOvertimes, variables: { id: this.props.userId } }]
          })
          .then(response => {
            const { ok, errors } = response.data.createOvertime;
            this.setState({ isLoading: false, errors: errors });
            console.log(response);
            if (errors) {
              Antd_Message.error(errors.message);
            }

            if (ok) {
              Antd_Message.success('New entry has been added');
              this.onFormClose()
            }
          })

      }

    });
  }

  handleDelete = (record) => {
    Antd_Modal.confirm({
      title: 'Are you sure you want to delete this entry?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {
        await this.props
          .deleteOvertimeMutation({
            variables: {
              id: record._id,
            },
            refetchQueries: [{ query: fetchOvertimes, variables: { id: this.props.userId } }]
          })
          .then(response => {
            const { ok, errors } = response.data.deleteOvertime;
            if (errors) {
              Antd_Message.error(errors.message);
            }
            if (ok) {
              Antd_Message.success('Entry has been deleted');
            }
          })
      },
    });
  }

  handleApprove = record => {
    Antd_Modal.confirm({
      title: 'Are you sure you want to delete this entry?',
      okText: 'Yes',
      okType: 'danger',
      onOk: async () => {

      },
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  componentDidMount() {
    // Get the div wrapping element width
    // this.setState({ containerWidth: this.divElement.clientWidth })
  }

  render() {
    const { formVisible } = this.state
    const { loading } = this.props.data

    const { users } = this.props

    let ApproverOptions
    if (users) {
      ApproverOptions = users.map(user => {
        const suffix = user.suffix || ""
        return (<Antd_Select.Option key={user._id}>{`${user.firstName} ${user.lastName} ${suffix}`}</Antd_Select.Option>)
      });
    }

    let MyTableData, AssgnedTableData
    if (!loading) {


      const overtimes = this.props.data.fetchUser.user.createdOvertimes || []
      if (overtimes) {
        MyTableData = overtimes.map(overtime => {
          return {
            ...overtime,
            key: overtime._id,
            date: moment(overtime.date, 'x').format("MM/DD/YYYY"),
            timeWorked: `${overtime.startTime} - ${overtime.endTime}`,
            duration: overtime.duration,
            status: overtime.status
          }
        })
      }


      const assignedOvertimes = this.props.data.fetchUser.user.assignedOvertimes || []
      if (assignedOvertimes) {
        AssgnedTableData = assignedOvertimes.map(assignedOvertime => {
          const suffix = assignedOvertime.creator.suffix || ""
          return {
            ...assignedOvertime,
            key: assignedOvertime._id,
            date: moment(assignedOvertime.date, 'x').format("MM/DD/YYYY"),
            timeWorked: `${assignedOvertime.startTime} - ${assignedOvertime.endTime}`,
            duration: assignedOvertime.duration,
            status: assignedOvertime.status,
            name: `${assignedOvertime.creator.firstName} ${assignedOvertime.creator.lastName} ${suffix}`
          }
        })
      }

    }

    const MyTableColumns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',

      },
      {
        title: 'Time Worked',
        dataIndex: 'timeWorked',
        key: 'time',
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
              color = "blue"
              break;
            case 'Approved':
              color = 'green'
              break;
            case 'Rejected':
              color = 'red'
              break;
            default: color = 'blue';
          }
          return <span><Antd_Tag color={color}>{status.toUpperCase()}</Antd_Tag></span>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        colSpan: 1,
        align: 'center',
        render: (text, record) => (
          <span>
            <Antd_Tooltip placement="left" title="Delete">
              <Antd_Button shape="circle" type="danger" ghost icon="delete" onClick={this.handleDelete.bind(this, record)} />
            </Antd_Tooltip>

          </span>
        ),
      }];

    const MyApprovalColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
      },
      {
        title: 'Time Worked',
        dataIndex: 'timeWorked',
        key: 'time',
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
              color = "blue"
              break;
            case 'Approved':
              color = 'green'
              break;
            case 'Rejected':
              color = 'red'
              break;
            default: color = 'blue';
          }
          return <span><Antd_Tag color={color}>{status.toUpperCase()}</Antd_Tag></span>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        colSpan: 1,
        align: 'center',
        render: (text, record) => (
          <span>
            <Antd_Tooltip placement="left" title="Approve">
              <Antd_Button shape="circle" icon="like" type="primary" ghost onClick={this.handleDelete.bind(this, record)} />
            </Antd_Tooltip>
            <Antd_Divider type="vertical" />
            <Antd_Tooltip placement="left" title="Reject">
              <Antd_Button shape="circle" icon="dislike" type="danger" ghost onClick={this.handleDelete.bind(this, record)} />
            </Antd_Tooltip>
          </span>
        ),
      }];

    return (
      <div style={{ height: "100%" }} ref={(divElement) => this.divElement = divElement}>
        <Antd_Spin
          tip="Fetching data..."
          spinning={loading}
          style={{ height: '100%' }}
        >
          <SUI_Segment raised>
            <SUI_Grid columns='equal' verticalAlign="middle">
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <SUI_Header as='h3' color="grey">
                    <SUI_Header.Content>My Overtime List</SUI_Header.Content>
                  </SUI_Header>
                </SUI_Grid.Column>
                <SUI_Grid.Column>
                  <Antd_Row type="flex" justify="end">
                    <Antd_Button type="primary" icon="plus" onClick={this.showForm} >New Entry</Antd_Button>
                  </Antd_Row>
                </SUI_Grid.Column>
              </SUI_Grid.Row>
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <Antd_Table bordered columns={MyTableColumns} dataSource={MyTableData} size="small" />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
            <Antd_Divider />
            <SUI_Grid columns='equal' verticalAlign="middle">
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <SUI_Header as='h3' color="grey">
                    <SUI_Header.Content>For My Approval</SUI_Header.Content>
                  </SUI_Header>
                </SUI_Grid.Column>
              </SUI_Grid.Row>
              <SUI_Grid.Row>
                <SUI_Grid.Column>
                  <Antd_Table bordered columns={MyApprovalColumns} dataSource={AssgnedTableData} size="small" />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
          </SUI_Segment>
          <OvertimeForm formVisible={formVisible} onFormClose={this.onFormClose} handleSubmit={this.handleSubmit} ref={this.saveFormRef} handleOnValueChange={this.handleOnValueChange} ApproverOptions={ApproverOptions} isLoading={this.state.isLoading} />
        </Antd_Spin>
      </div>
    );
  }
};

// export default graphql(createOvertimeMutation, { name: 'createOvertimeMutation' })(Overtime);


export default compose(
  graphql(createOvertimeMutation, { name: 'createOvertimeMutation' }),
  graphql(deleteOvertimeMutation, { name: 'deleteOvertimeMutation' }),
  graphql(fetchOvertimes, {
    options: (props) => ({ variables: { id: props.userId } })
  })
)(Overtime)