import { IsNotEmpty, IsString } from 'class-validator';
export class UserDTO {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsString()
  joinedAt: Date;

  @IsString()
  emailAddress: string;

  @IsString()
  phoneNumber: string;
}
