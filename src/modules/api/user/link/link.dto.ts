import { IsNotEmpty, IsString, IsBoolean, IsIn } from 'class-validator';

export class LinkDTO {
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
  customUrl: string;
}
