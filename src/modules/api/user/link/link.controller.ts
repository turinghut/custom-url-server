import { LinkService } from './link.service';
import { IResult } from './../../../../common/interfaces/response';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LinkDTO } from './link.dto';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Get()
  async getAllLinksForUserId(
    @Param('userId') userId: string,
  ): Promise<IResult<LinkDTO>> {
    try {
      const links = await this.linkService.getAllLinksOfUser(userId);
      if (links) {
        const linkArray = [];
        links.forEach(link => {
          const resp: LinkDTO = {
            name: link.name,
            customUrl: link.customUrl,
            redirectsTo: link.redirectsTo,
            status: link.status,
            inPool: link.inPool,
          };
          linkArray.push(resp);
        });
        return {
          status: 'OK',
          result: linkArray,
        } as IResult<LinkDTO>;
      }
    } catch (err) {
      return {
        status: 'NOT OK',
        error: err.message,
      } as IResult<LinkDTO>;
    }
  }
  @Post()
  async create(
    @Body() linkDTO: LinkDTO,
    @Param('userId') userId: string,
  ): Promise<IResult<LinkDTO>> {
    try {
      const result = await this.linkService.create(linkDTO, userId);
      return { status: 'OK', result: result };
    } catch (error) {
      return { status: 'NOT OK', error: error.message };
    }
  }
}
