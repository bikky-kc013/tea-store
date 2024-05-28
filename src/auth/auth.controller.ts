import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: UserCredentialsDto) {
    const datas = await this.authService.create(data);
    return {
      status: 'Success',
      data: datas,
      message: 'Successfully registred a new user',
    };
  }
}
