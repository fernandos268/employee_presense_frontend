import {
  Button as Antd_Button,
  Divider as Antd_Divider,
  Tag as Antd_Tag,
  Tooltip as Antd_Tooltip,
} from 'antd';

import { Button as SUIButton } from 'semantic-ui-react';

import React from 'react';

export const MyTableColumns = handleDelete => {
  return [
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
          <Antd_Tooltip placement="left" title="Cancel">
            <SUIButton
              circular
              color="red"
              basic
              icon="trash alternate outline"
              onClick={() => handleDelete(record)}
            />
          </Antd_Tooltip>
        </span>
      ),
    },
  ];
};

export const MyApprovalColumns = handleApproveReject => {
  return [
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
                  onClick={() => handleApproveReject(record, 'Approved')}
                />
              </Antd_Tooltip>
              <Antd_Divider type="vertical" />
              <Antd_Tooltip placement="left" title="Reject">
                <Antd_Button
                  shape="circle"
                  icon="dislike"
                  type="danger"
                  ghost
                  onClick={() => handleApproveReject(record, 'Rejected')}
                />
              </Antd_Tooltip>
            </span>
          );
        }
        return <label>N/A</label>;
      },
    },
  ];
};
