import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { WebModule } from './modules/web/web.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './environment';

@Module({
  imports: [ApiModule, WebModule, MongooseModule.forRoot(environment.DB_PATH)],
})
export class AppModule {}
