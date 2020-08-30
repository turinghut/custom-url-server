import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Get()
  async getAllLinksForUserId(@Param('userId') userId: string) {
    const links = await this.linkService.getAllLinksForUser(userId);
    if (links.length) {
      return {
        status: 'OK',
        result: JSON.stringify(links),
      };
    }
    return {
      status: 'NOT OK',
      result: 'No Links Available',
    };
  }
}
