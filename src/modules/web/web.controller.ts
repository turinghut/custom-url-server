import { Controller, Get } from '@nestjs/common';
import { environment } from '../../environment';

@Controller({ host: environment.WEB_HOST })
export class WebController {
  @Get()
  fn() {
    return 'web home route';
  }
}
