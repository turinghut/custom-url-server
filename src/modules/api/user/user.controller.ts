import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IResult } from 'src/common/interfaces/response';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUserById(@Param() params) {
    try {
      const user = await this.userService.getUserById(params.id);
      if (user) {
        const resp: IResult<unknown> = {
          status: 'OK',
          result: JSON.stringify(user),
        };
        return resp;
      }
      const errResp: IResult<unknown> = {
        status: 'NOT OK',
        error: 'User not found',
        result: null,
      };
      return errResp;
    } catch (err) {
      const errResp: IResult<unknown> = {
        status: 'NOT OK',
        error: 'An error occured',
        result: null,
      };
      return errResp;
    }
  }
}
