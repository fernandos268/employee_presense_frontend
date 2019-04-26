import {
  Button as Antd_Button,
  Divider as Antd_Divider,
  Tag as Antd_Tag,
  Tooltip as Antd_Tooltip,
} from 'antd';
import React from 'react';

import { Button as SUIButton } from 'semantic-ui-react';

export const MytableColumns = handleDelete => {
  return [
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
