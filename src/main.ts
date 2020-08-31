import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environment } from 'src/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Custom URL')
    .setDescription('API Description of Custom URL server')
    .setVersion('1.0')
    .addTag('custom-url')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(environment.PORT);
}

bootstrap();
