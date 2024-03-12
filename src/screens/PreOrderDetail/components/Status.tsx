import React from 'react';
import StatusChips from '../../../components/StatusChips';
import {ApprovalStatus} from '../../../interfaces/project';

type StatusProps = {
  status?: ApprovalStatus | number | string;
  text?: string;
};

const Status = ({status, text}: StatusProps) => {
  const parseStatus = Number(status);

  if (parseStatus === ApprovalStatus.APPROVED) {
    return <StatusChips label={text || 'Disetujui'} type="success" />;
  }

  if (parseStatus === ApprovalStatus.REJECTED) {
    return <StatusChips label={text || 'Ditolak'} type="danger" />;
  }

  return <StatusChips label={text || 'Belum diproses'} type="warning" />;
};

export default Status;
