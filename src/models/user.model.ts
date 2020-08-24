export interface IUser {
  _id: string;
  name: string;
  joinedAt: Date;
  emailAddress: string;
  phoneNumber: string;
}

export class User implements IUser {
  _id: string;
  name: string;
  joinedAt: Date;
  emailAddress: string;
  phoneNumber: string;
}
