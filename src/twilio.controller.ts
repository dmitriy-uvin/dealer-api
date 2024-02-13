import { Controller, Header, Logger, Post, Req } from '@nestjs/common';
import { twiml } from 'twilio';
import { Request } from 'express';

@Controller('twilio')
export class TwilioController {
  private readonly logger: Logger = new Logger(TwilioController.name);

  @Post('/ml')
  @Header('Content-Type', 'text/xml')
  public async twilML(@Req() req: Request) {
    const response = new twiml.VoiceResponse();
    const to = req.body.To;
    if (!to) {
      return response.toString();
    }
    const dial = response.dial({
      answerOnBridge: true,
      callerId: '+12672449950',
      timeout: 15,
    });
    dial['number'](to);
    return response.toString();
  }
}
