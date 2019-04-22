import React from 'react';
import {
  Drawer as Antd_Drawer,
  Form as Antd_Form,
  DatePicker as Antd_DatePicker,
  TimePicker as Antd_TimePicker,
  Modal as Antd_Modal,
  Input as Antd_Input,
  Row as Antd_Row,
  Col as Antd_Col,
  Select as Antd_Select,
  Spin as Antd_Spin,
  Statistic as Antd_Statistic,
  Icon as Antd_Icon,
} from 'antd';

import { Button as SUI_Button, Icon as SUI_Icon } from 'semantic-ui-react';

const Dayoff_Form = props => {
  const { getFieldDecorator } = props.form;

  const { handleSubmit, onFormClose } = props;

  return (
    <Antd_Modal
      centered
      visible={props.formVisible}
      title="New Entry Form"
      okText="Submit"
      onCancel={onFormClose}
      onOk={handleSubmit}
      maskClosable={false}
    >
      <Antd_Spin
        tip="Submitting Entry"
        spinning={props.isLoading}
        style={{ height: '100%' }}
      >
        <Antd_Form layout="vertical">
          <Antd_Form.Item label="Start Date">
            {getFieldDecorator('startDate', {
              rules: [
                {
                  required: true,
                  message: 'Please select the start date',
                },
              ],
            })(
              <Antd_DatePicker
                showToday={false}
                style={{ width: '100%' }}
                format="MM/DD/YYYY"
              />
            )}
          </Antd_Form.Item>

          <Antd_Form.Item label="End Date">
            {getFieldDecorator('endDate', {
              rules: [
                {
                  required: true,
                  message: 'Please select the end date',
                },
              ],
            })(
              <Antd_DatePicker
                showToday={false}
                style={{ width: '100%' }}
                format="MM/DD/YYYY"
              />
            )}
          </Antd_Form.Item>

          <Antd_Form.Item label="Duration">
            {getFieldDecorator('duration', {
              rules: [
                {
                  required: true,
                  message: 'Auto Calculated',
                },
              ],
            })(<Antd_Input disabled />)}
          </Antd_Form.Item>

          <Antd_Form.Item label="Description">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: 'Plese provide the description of work done',
                },
              ],
            })(
              <Antd_Input.TextArea
                placeholder="Description of work done"
                rows={4}
              />
            )}
          </Antd_Form.Item>
          <Antd_Form.Item label="Approver">
            {getFieldDecorator('approver', {
              rules: [
                { required: true, message: 'Please select the approver' },
              ],
            })(
              <Antd_Select
                showSearch
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                notFoundContent={null}
              >
                {props.ApproverOptions}
              </Antd_Select>
            )}
          </Antd_Form.Item>
        </Antd_Form>
      </Antd_Spin>
    </Antd_Modal>
  );
};

const DayOffForm = Antd_Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    props.handleOnValueChange(props, changedValues, allValues);
  },
})(Dayoff_Form);

export default DayOffForm;
