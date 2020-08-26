import { Controller } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('users/:userId/links')
export class LinkController {
  constructor(private linkService: LinkService) {}
}
