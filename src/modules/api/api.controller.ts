import { Controller, Get } from '@nestjs/common';
import { environment } from '../../environment';

@Controller({ host: environment.API_HOST })
export class ApiController {
  @Get()
  fn(): string {
    return 'api home route';
  }
}
