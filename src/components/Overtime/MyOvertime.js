import React, { Component, createRef } from 'react';

import moment from 'moment'

// GraphQL 
import { graphql, compose } from 'react-apollo';
import { createOvertimeMutation } from '../Graphql/mutations'
import { fetchOvertimes } from '../Graphql/queries'

// External Library Components Imports --------------------
import {
  Grid as SUI_Grid,
  Segment as SUI_Segment,
  Header as SUI_Header,
} from 'semantic-ui-react'
import {
  Table as Antd_Table,
  Divider as Antd_Divider,
  Tag as Antd_Tag,
  Row as Antd_Row,
  Button as Antd_Button,
  message as Antd_Message,
  Icon as Antd_Icon,
  Spin as Antd_Spin,
} from 'antd';

// Component Imports -------------------------------------
import OvertimeForm from './OvertimeForm'




// TABLE DATA --------------------------------------------

const columns = [
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
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    align: 'center',
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
    render: (id) => (
      <span>
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }];

const data = [{
  key: '1',
  status: 'Rejected',
}, {
  key: '2',
  status: 'Approved',
}, {
  key: '3',
  status: 'Pending',
}];


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
              status: 'Pending'
            }
          })
          .then(response => {
            const { ok, errors } = response.data.createOvertime;
            this.setState({ isLoading: false, errors: errors });
            console.log(response);
            if (errors) {

            }

            if (ok) {
              Antd_Message.success('New entry has been added');
              this.onFormClose()
            }
          })

      }

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
    if (!loading) {
      const tableData = this.props.data.fetchUser.user
      console.log(tableData.createdOvertimes);


    }

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
                  <Antd_Table bordered columns={columns} dataSource={data} />
                </SUI_Grid.Column>
              </SUI_Grid.Row>
            </SUI_Grid>
          </SUI_Segment>
          <OvertimeForm formVisible={formVisible} onFormClose={this.onFormClose} handleSubmit={this.handleSubmit} ref={this.saveFormRef} handleOnValueChange={this.handleOnValueChange} />
        </Antd_Spin>
      </div>
    );
  }
};

// export default graphql(createOvertimeMutation, { name: 'createOvertimeMutation' })(Overtime);


export default compose(
  graphql(createOvertimeMutation, { name: 'createOvertimeMutation' }),
  graphql(fetchOvertimes, {
    options: (props) => ({ variables: { id: props.userId } })
  })
)(Overtime)