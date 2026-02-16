import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages() {
    return this.appService.getMessages();
  }

  @Post()
  addMessage(@Body() body: { name: string; message: string }) {
    return this.appService.addMessage(body.name, body.message);
  }

  // Optional: Add a root route to check if API is running
  @Get('health')
  healthCheck() {
    return { status: 'OK', message: 'Guestbook API is running' };
  }
}