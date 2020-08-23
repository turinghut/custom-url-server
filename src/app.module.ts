import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { WebModule } from './modules/web/web.module';

@Module({
  imports: [ApiModule, WebModule],
})
export class AppModule {}
