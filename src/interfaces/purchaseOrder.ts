export enum ApprovalStatus {
  NOT_APPROVED,
  APPROVED,
  REJECTED,
}

export type PurchaseOrder = {
  status: string;
  statuss: number;
  pesan: string;
  divisi: string;
  jabatan: string;
  PONumber: string;
  PONumber2: string;
  PODate: Date;
  VendorNo: string;
  VendorName: string;
  Delivery: string;
  PersonInCharge: string;
  TermsOfPayment: string;
  OrderedBy: string;
  KodeProd: string;
  KodeDept: string;
  KodeBUdget: string;
  nilai: number;
  app_pic: string;
  app_pm: string;
  app_kuu: string;
  imei: null | string;
  items: Item[];
  PPN: number;
  PPNNIlai: number;
  Total: number;
};

export type Item = {
  NIK: string;
  PONumber: string;
  PONumber2: string;
  workshop: string;
  kodeprod: string;
  item_code: string;
  item_name: string;
  QTY: number;
  unit: string;
  price: number;
  subTotal: number;
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
