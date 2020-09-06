import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from './link.service';
import { IResult } from 'src/common/interfaces/response';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Get()
  async getAllLinksForUserId(@Param('userId') userId: string) {
    const links = await this.linkService.getAllLinksOfUser(userId);
    const response = {} as IResult;
    if (links) {
      response.status = 'OK';
      response.result = links;
    } else {
      response.status = 'NOT OK';
      response.error = 'Unable to get links';
      response.result = null;
    }
    return response;
  }
}
