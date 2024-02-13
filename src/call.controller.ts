import { Controller, Get } from '@nestjs/common';
import { TwilioService } from './twilio.service';

@Controller('call')
export class CallController {
  public constructor(private twilioService: TwilioService) {}

  @Get('access-token/mobile')
  public async getCallAccessTokenMobile() {
    const userId = (Math.random() * 100000).toString();
    const token: string =
      await this.twilioService.getAccessTokenForCall(userId);
    return {
      accessToken: token,
    };
  }
}
