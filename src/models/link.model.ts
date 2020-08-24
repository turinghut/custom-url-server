export enum LinkStatus {
  inactive = 0,
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

export class Link implements ILink {
  _id: string;
  name: string;
  userId: string;
  createdAt: Date;
  status: LinkStatus;
  customUrl: string;
  redirectsTo: string;
  inPool: boolean;
}
