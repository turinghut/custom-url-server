import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';
import { UserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id) {
    const errResp: IResult<UserDTO> = {
      status: 'NOT OK',
      error: '',
      result: null,
    };

    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        const userResp: UserDTO = {
          name: user.name,
          _id: user.id,
          emailAddress: user.emailAddress,
          joinedAt: user.joinedAt,
          phoneNumber: user.phoneNumber,
        };
        const resp: IResult<UserDTO> = {
          status: 'OK',
          result: userResp,
        };
        return resp;
      }
      errResp.error = 'User not found';
      return errResp;
    } catch (err) {
      errResp.error = 'An error occured';
      return errResp;
    }
  }
}
