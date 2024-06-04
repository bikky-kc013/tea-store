import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';

@Controller('api/v1/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  async findAll() {
    const admins = await this.adminService.findAll();
    if (!admins) {
      return {
        status: 'Success',
        data: [],
        message: 'All admins Fetched',
      };
    }
    return {
      status: 'Success',
      data: admins,
      message: 'All admins Fetched',
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createAdmin(@Body() admin: AdminDto) {
    const newAdmin = await this.adminService.create(admin);
    return {
      status: 'Success',
      data: newAdmin,
      message: 'Admin created Successfully',
    };
  }
}
