import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for your Codespaces frontend
  app.enableCors({
    origin: [
      'https://fictional-space-zebra-5g46gw9x9q4p24pj5-5173.app.github.dev',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('✅ Backend started on port 3000');
}
bootstrap();