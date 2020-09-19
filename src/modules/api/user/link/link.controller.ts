import { LinkService } from './link.service';
import { IResult } from './../../../../common/interfaces/response';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
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
  @Put(':id')
  async editLink(
    @Param('id') linkId: string,
    @Body() linkData: ILink,
  ): Promise<IResult<LinkDTO>> {
    try {
      const result = await this.linkService.editLink(linkId, linkData);
      const updatedLink = new LinkDTO(result);
      return {
        status: 'OK',
        result: updatedLink,
      } as IResult<LinkDTO>;
    } catch (err) {
      return {
        status: 'NOT OK',
        error: err.message,
      } as IResult<LinkDTO>;
    }
  }
}
