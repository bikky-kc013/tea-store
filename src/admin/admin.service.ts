import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcryptjs';
import { serializedAdmin } from './interceptors/admin.interceptors';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}
  async findById(id: string) {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
    }
    return admin;
  }

  async findAll() {
    try {
      const admins = await this.adminRepository.findAll();
      if (!admins) return [];
      admins.filter((admin) => {
        return admin.id !== 'default101';
      });
      return admins;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
  async remove(id: string) {
    try {
      const removed = await this.adminRepository.removeAdmin(id);
      if (removed === false) {
        throw new HttpException('Unable to remove Admin', 500);
      }
      return removed;
    } catch (error) {
      throw error;
    }
  }
  async create(admin: AdminDto) {
    try {
      const existingAdmin = await this.adminRepository.findByUserName(
        admin.username,
      );
      const password = await this.hashPassword(admin.password);
      if (existingAdmin) {
        throw new HttpException('Admin already exixts', HttpStatus.CONFLICT);
      }
      const saveAdmin = await this.adminRepository.create({
        ...admin,
        password,
      });
      return new serializedAdmin(saveAdmin);
    } catch (error) {
      throw error;
    }
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findByUserName(username: string) {
    const admin = await this.adminRepository.findByUserName(username);
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
    }
    return admin;
  }
}
