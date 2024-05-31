import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { refreshAuthGuard } from './guards/refresh-jwt-auth.guard';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @Get('data')
  async data() {
    return {
      status: 'Success',
      data: [
        {
          name: 'Bikky',
        },
      ],
      message: 'Successfully fetched the data',
    };
  }

  @UseGuards(refreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    const token = await this.authService.refresh(req.user);
    return {
      status: 'Success',
      accessToken: token,
      message: 'Access token',
    };
  }
}
