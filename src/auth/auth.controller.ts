import { Request, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() data: UserCredentialsDto) {
    const datas = await this.authService.create(data);
    const { password, ...result } = datas;
    password;
    return {
      status: 'Success',
      data: result,
      message: 'Successfully registred a new user',
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const response = await this.authService.login(req.user);
    return {
      status: 'success',
      data: response,
      message: 'Sucessfully logged in',
    };
  }
}
