import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<IResult<UserDTO>> {
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        const userResp: UserDTO = {
          name: user.name,
          _id: user._id,
          emailAddress: user.emailAddress,
          joinedAt: user.joinedAt,
          phoneNumber: user.phoneNumber,
        };
        return {
          status: 'OK',
          result: userResp,
        } as IResult<UserDTO>;
      }
      return {
        status: 'NOT OK',
        error: 'User not found',
      } as IResult<UserDTO>;
    } catch (err) {
      return {
        status: 'NOT OK',
        error: err.message,
      } as IResult<UserDTO>;
    }
  }
}
