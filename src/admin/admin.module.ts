import { Module } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminController],
  providers: [AdminRepository, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
