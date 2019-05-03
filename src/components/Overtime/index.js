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
import React, { Component, createRef } from 'react';

// GraphQL
import { compose, graphql } from 'react-apollo';

// External Library Components Imports --------------------
import {
  Grid as SUI_Grid,
  Header as SUI_Header,
  Segment as SUI_Segment,
} from 'semantic-ui-react';
import {
  createOvertimeMutation,
  deleteOvertimeMutation,
  updateOvertimeMutation,
} from '../Graphql/mutations';
import { fetchUserData } from '../Graphql/queries';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestCurrentUserOvertimes } from '../../redux/actions';

// Component Imports -------------------------------------
import OvertimeForm from './OvertimeForm';
import { MyApprovalColumns, MyTableColumns } from './OvertimeTableColumns';
import { TransformTableData } from './TransformTableData';

class Overtime extends Component {
  constructor(props) {
    super(props);
    this.formRef = createRef();
    this.state = {
      duration: '',
      formVisible: false,
      containerWidth: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.requestCurrentUserOvertimes(this.props.userId);
  }

  showForm = () => {
    this.setState({
      formVisible: true,
    });
  };

  onFormClose = () => {
    const form = this.formRef;
    form.resetFields();
    this.setState({
      formVisible: false,
    });
  };

  handleOnValueChange = (props, changedValues, allValues) => {
    const form = this.formRef;

    if (allValues.timeEnded && allValues.timeStarted) {
      const start = moment(allValues.timeStarted._d, 'YYYY-MM-DD HH:mm:ss');
      const end = moment(allValues.timeEnded._d, 'YYYY-MM-DD HH:mm:ss');

      const calcDuration = moment.duration(end.diff(start));
      const duration = `${calcDuration._data.hours} Hr & ${
        calcDuration._data.minutes
      } Min`;

      if (calcDuration._milliseconds > 0) {
        // return this.setState({ duration })
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
          timeStarted: fieldsValue['timeStarted'].format('HH:mm'),
          timeEnded: fieldsValue['timeEnded'].format('HH:mm'),
        };
        const response = await this.props.createOvertimeMutation({
          variables: {
            date: values.date.toISOString(),
            startTime: values.timeStarted,
            endTime: values.timeEnded,
            duration: values.duration,
            description: values.description,
            status: 'Pending',
            approverId: values.approver,
          },
          refetchQueries: [
            { query: fetchUserData, variables: { id: this.props.userId } },
          ],
        });
        const { ok, errors } = response.data.createOvertime;
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
      onOk: () => {
        return this.props
          .deleteOvertimeMutation({
            variables: {
              id: record._id,
            },
            refetchQueries: [
              { query: fetchUserData, variables: { id: this.props.userId } },
            ],
          })
          .then(response => {
            const { ok, errors } = response.data.deleteOvertime;
            if (errors) {
              return Antd_Message.error(errors.message);
            }
            if (ok) {
              return Antd_Message.success('Entry has been deleted');
            }
          });
      },
    });
  };

  handleApproveReject = (record, status) => {
    const question = status === 'Approved' ? 'Approve' : 'Reject';
    Antd_Modal.confirm({
      title: `${question} this overtime entry?`,
      okText: 'Yes',
      okType: 'primary',
      centered: true,
      onOk: () => {
        return this.props
          .updateOvertimeMutation({
            variables: {
              id: record._id,
              status: status,
            },
            refetchQueries: [
              { query: fetchUserData, variables: { id: this.props.userId } },
            ],
          })
          .then(response => {
            const { ok, errors } = response.data.updateOvertime;
            if (errors) {
              return Antd_Message.error(errors.message);
            }
            if (ok) {
              return Antd_Message.success(`Entry has been ${status}`);
            }
          });
      },
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    console.log(this.props);
    const { formVisible } = this.state;
    const { loading } = this.props.data;
    const { users } = this.props;

    let MyOvertimes,
      MyAssignedOvertimes = [];

    // TRANSFORM USERS TO BE POPULATED IN APPROVERS DROPDOWN
    let ApproverOptions = [];
    // if (users) {
    //   ApproverOptions = users.map(user => {
    //     const suffix = user.suffix || '';
    //     return (
    //       <Antd_Select.Option key={user._id}>{`${user.firstName} ${
    //         user.lastName
    //       } ${suffix}`}</Antd_Select.Option>
    //     );
    //   });
    // }

    // if (!loading) {
    //   MyOvertimes = TransformTableData(
    //     this.props.data.fetchUser.user.createdOvertimes,
    //     'MyTableData'
    //   );
    //   MyAssignedOvertimes = TransformTableData(
    //     this.props.data.fetchUser.user.assignedOvertimes,
    //     'AssignedTableData'
    //   );
    // }

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
                    <SUI_Header.Content>My Overtime List :</SUI_Header.Content>
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
                    columns={MyTableColumns(this.handleDelete)}
                    dataSource={MyOvertimes}
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
                    dataSource={MyAssignedOvertimes}
                    size="small"
                  />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
          </SUI_Segment>
          <OvertimeForm
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

// export default graphql(createOvertimeMutation, { name: 'createOvertimeMutation' })(Overtime);

// export default compose(
//   graphql(createOvertimeMutation, { name: 'createOvertimeMutation' }),
//   graphql(deleteOvertimeMutation, { name: 'deleteOvertimeMutation' }),
//   graphql(updateOvertimeMutation, { name: 'updateOvertimeMutation' }),
//   graphql(fetchUserData, {
//     options: props => ({ variables: { id: props.userId } }),
//   })
// )(Overtime);

const mapStateToProps = state => ({ data: state });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestCurrentUserOvertimes,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overtime);
