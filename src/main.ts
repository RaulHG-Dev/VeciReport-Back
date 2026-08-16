import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('VeciReport API')
    .setDescription('The VeciReport API description')
    .setVersion('1.0.0')
    .addTag('VeciReport')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
  }).catch((err) => {
    console.error('Error starting server:', err);
  });
}
bootstrap();
