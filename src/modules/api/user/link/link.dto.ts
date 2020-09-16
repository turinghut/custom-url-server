import { IsNotEmpty, IsString, IsBoolean, IsIn } from 'class-validator';
import { ILink } from 'src/models/link.model';

export class LinkDTO {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  @IsString()
  redirectsTo: string;

  @IsIn([0, 1, 2])
  @IsNotEmpty()
  status: number;

  @IsString()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  inPool: boolean;

  @IsString()
  @IsNotEmpty()
  customUrl: string;

  constructor(link: ILink) {
    this._id = link._id;
    this.name = link.name;
    this.status = link.status;
    this.redirectsTo = link.redirectsTo;
    this.customUrl = link.customUrl;
    this.inPool = link.inPool;
  }
}
