import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string) {
    const admin = await this.authService.validateAdmin({ username, password });
    if (!admin) {
      throw new HttpException('Invalid Credentials', 400);
    }
    return admin;
  }
}
