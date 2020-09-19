import { IsNotEmpty, IsString, IsDate } from 'class-validator';
export class UserDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsDate()
  joinedAt: Date;

  @IsString()
  emailAddress: string;

  @IsString()
  phoneNumber: string;
}
