import { LinkService } from './link.service';
import { IResult } from './../../../../common/interfaces/response';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LinkDTO } from './link.dto';
import { ILink } from 'src/models/link.model';

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
        const linkArray = links.map(
          link =>
            ({
              _id: link.id,
              name: link.name,
              customUrl: link.customUrl,
              redirectsTo: link.redirectsTo,
              status: link.status,
              inPool: link.inPool,
            } as LinkDTO),
        );
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
    @Body() linkData: ILink,
    @Param('userId') userId: string,
  ): Promise<IResult<LinkDTO>> {
    try {
      const link = await this.linkService.create(linkData, userId);
      const linkDTO = {
        _id: link._id,
        name: link.name,
        customUrl: link.customUrl,
        redirectsTo: link.redirectsTo,
        status: link.status,
        inPool: link.inPool,
      } as LinkDTO;

      return { status: 'OK', result: linkDTO };
    } catch (error) {
      return { status: 'NOT OK', error: error.message };
    }
  }
}
