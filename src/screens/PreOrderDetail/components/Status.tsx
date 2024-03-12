import React from 'react';
import StatusChips from '../../../components/StatusChips';
import {ApprovalStatus} from '../../../interfaces/project';

const Status = ({status, text}: {status?: ApprovalStatus; text: string}) => {
  if (status === ApprovalStatus.APPROVED) {
    return <StatusChips label={text} type="success" />;
  }

  if (status === ApprovalStatus.REJECTED) {
    return <StatusChips label={text} type="danger" />;
  }

  return <StatusChips label={text} type="primary" />;
};

export default Status;
