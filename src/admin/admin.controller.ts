import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorators';

@Controller('api/v1/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findById(@Param('id') id: string) {
    const admin = await this.adminService.findById(id);
    return {
      status: 'Success',
      data: admin,
      message: 'Admin created Successfully',
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
