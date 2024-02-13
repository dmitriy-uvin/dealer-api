import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioController } from './twilio.controller';
import { TwilioService } from './twilio.service';
import { CallController } from './call.controller';

@Module({
  imports: [],
  controllers: [AppController, TwilioController, CallController],
  providers: [AppService, TwilioService],
})
export class AppModule {}
