import { LinkService } from './link.service';
import { IResult } from './../../../../common/interfaces/response';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
        const linkArray = links.map(link => new LinkDTO(link));
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
      const linkDTO = new LinkDTO(link);
      return { status: 'OK', result: linkDTO };
    } catch (error) {
      return { status: 'NOT OK', error: error.message };
    }
  }

  @Delete(':id')
  async deleteLink(@Param('id') linkId: string): Promise<IResult<LinkDTO>> {
    try {
      const result = await this.linkService.delete(linkId);
      const deletedLink = new LinkDTO(result);
      return { status: 'OK', result: deletedLink };
    } catch (error) {
      return { status: 'NOT OK', error: error.message };
    }
  }

  @Get(':id')
  async getLink(@Param('id') linkId: string): Promise<IResult<LinkDTO>> {
    try {
      const result = await this.linkService.get(linkId);
      const link = new LinkDTO(result);
      return { status: 'OK', result: link } as IResult<LinkDTO>;
    } catch (error) {
      return { status: 'NOT OK', error: error.message } as IResult<LinkDTO>;
    }
  }

  @Get('pool')
  async getPoolLinks(
    @Param('userId') userId: string,
  ): Promise<IResult<LinkDTO>> {
    try {
      const links = await this.linkService.getPoolLinksOfUser(userId);
      const linkDTOs = links.map(link => new LinkDTO(link));
      return { status: 'OK', result: linkDTOs };
    } catch (error) {
      return { status: 'NOT OK', error: error.message };
    }
  }
}
