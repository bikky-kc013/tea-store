import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

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
