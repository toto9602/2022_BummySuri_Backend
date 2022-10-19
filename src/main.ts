import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function buildSwagger(app: INestApplication) {
  const docs = new DocumentBuilder()
    .setTitle('NFTProject-API')
    .setDescription('API Descriptions')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('swagger', app, document);
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  buildSwagger(app);
  await app.listen(3000);
}
bootstrap();
