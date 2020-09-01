import { IResult } from './../../../../common/interfaces/response';
import { Controller, Post, Body, Param } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkDTO } from './link.dto';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Post()
  async create(
    @Body() linkDTO: LinkDTO,
    @Param('userId') userId,
  ): Promise<IResult<LinkDTO>> {
    const { name, status, customUrl, redirectsTo, inPool = false } = linkDTO;
    try {
      const result = await this.linkService.create(
        name,
        status,
        customUrl,
        redirectsTo,
        inPool,
        userId,
      );
      return { status: 'OK', result: result };
    } catch (error) {
      return { status: 'NOT OK', error: error.message, result: null };
    }
  }
}
