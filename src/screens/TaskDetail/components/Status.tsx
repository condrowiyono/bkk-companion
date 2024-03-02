import React from 'react';
import StatusChips from '../../../components/StatusChips';
import {ApprovalStatus} from '../../../interfaces/project';

const Status = ({status}: {status?: ApprovalStatus}) => {
  if (status === ApprovalStatus.APPROVED) {
    return <StatusChips label="Disetujui" type="success" />;
  }

  if (status === ApprovalStatus.REJECTED) {
    return <StatusChips label="Ditolak" type="danger" />;
  }

  return <StatusChips label="Menunggu Persetujuan" type="primary" />;
};

export default Status;
