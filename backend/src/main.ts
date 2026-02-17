import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'https://fictional-space-zebra-5g46gw9x9q4p24pj5-5173.app.github.dev',
      'https://sofishee-guestbook.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  });
  
  await app.listen(3000);
  console.log('✅ Backend running on http://localhost:3000');
  return app;
}

// For Vercel serverless
let cachedApp: any;

export default async function handler(req: any, res: any) {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }
  
  const app = cachedApp.getHttpServer();
  app.emit('request', req, res);
}

// For local development
if (require.main === module) {
  bootstrap();
}