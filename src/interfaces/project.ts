export enum ApprovalStatus {
  NOT_APPROVED,
  APPROVED,
  REJECTED,
}
export type Project = {
  kode_prod: string;
  nama_prod: string;
  segmen_name: string;
  customer: string;
  divisi: string;
  png_jawab: string | null;
  tgl_mulai: string;
  tgl_akhir: string;
  tgl_kontrak: string;
  nilai_prod_rp: string;
  approval_kuu?: string;
  approval_dirOp?: string;
  approval_dirkeu?: string;
  app_kuu_dt: string | null;
  app_dirop_dt: string | null;
  app_dirkeu_dt: string | null;
};

export type UpdateStatus = {
  hasil: string;
  pesan: string;
};

export type UpdateStatusResponse = {
  message: string;
  data?: UpdateStatus;
};

export type UpdateStatusPayload = {
  approvals?: ApprovalStatus;
};
