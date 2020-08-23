import { Controller, Get } from '@nestjs/common';
import { environment } from '../../environment';

@Controller({ host: environment.API_HOST })
export class ApiController {
  @Get()
  fn() {
    return 'api home route';
  }
}
