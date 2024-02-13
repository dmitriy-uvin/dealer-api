import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private readonly client: Twilio;
  private readonly logger: Logger = new Logger(TwilioService.name);
  private readonly authToken: string;
  private readonly accountSid: string;
  private readonly apiKey: string;
  private readonly applicationId: string;
  private readonly apiKeySecret: string;

  public constructor() {
    this.authToken = '';
    this.accountSid = '';
    this.apiKey = '';
    this.apiKeySecret = '';
    this.applicationId = '';
    this.client = new Twilio(this.accountSid, this.authToken);
  }

  public async getAccessTokenForCall(userId: string): Promise<string> {
    const AccessToken = require('twilio').jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: this.applicationId,
      incomingAllow: true,
    });
    const token = new AccessToken(
      this.accountSid,
      this.apiKey,
      this.apiKeySecret,
      {
        identity: userId.replaceAll('-', '_'),
      },
    );
    token.addGrant(voiceGrant);
    const jwtValue = token.toJwt();
    return jwtValue;
  }
}
