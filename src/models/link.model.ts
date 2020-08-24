export enum LinkStatus {
  inactive,
  active,
  deleted,
}

export interface ILink {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
  status: LinkStatus;
  customUrl: string;
  redirectsTo: string;
  inPool: boolean;
}
