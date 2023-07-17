import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(request, done) {
    const apiKey = request.headers['x-rapidapi-proxy-secret'];
    const validApiKey = this.configService.get<string>('rapid.secret');
    if (apiKey === validApiKey) {
      return done(null, true);
    }
    return done(new UnauthorizedException(), false);
  }
}
