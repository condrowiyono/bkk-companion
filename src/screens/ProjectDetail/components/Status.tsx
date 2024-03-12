import React from 'react';
import StatusChips from '../../../components/StatusChips';
import {ApprovalStatus} from '../../../interfaces/project';

type StatusProps = {
  status?: ApprovalStatus | number | string | null;
  text?: string;
};

const Status = ({status, text}: StatusProps) => {
  // approval should 0, 1, 2
  // or any string

  if (Number(status) === ApprovalStatus.APPROVED) {
    return <StatusChips label={text || 'Disetujui'} type="success" />;
  }

  if (Number(status) === ApprovalStatus.REJECTED) {
    return <StatusChips label={text || 'Ditolak'} type="danger" />;
  }

  if (Number(status) === ApprovalStatus.NOT_APPROVED || status === null) {
    return <StatusChips label={text || 'Belum diproses'} type="warning" />;
  }

  return <StatusChips label={text || String(status)} type="success" />;
};

export default Status;
