import { Controller, Post, Body, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private linkService: LinkService) { };
  @Post()
  async create(@Body() body, @Param() params) {
     const result = await this.linkService.create(body,params.userId);
     return { "status":"OK" , "result":result};
  }
}
