import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorators';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get()
  async getAll() {
    const data = await this.userService.getAllUsers();
    if (!data) {
      return {
        status: 'Success',
        data: [],
        message: 'Successfully fetched all the users',
      };
    }
    return {
      status: 'Success',
      data: data,
      message: 'Successfully fetched all the users',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async get(@Param('id') id: string) {
    const data = await this.userService.getUserInfo(id);
    return {
      status: 'Success',
      data: data,
      message: 'Successfully fetched all the users',
    };
  }
}
