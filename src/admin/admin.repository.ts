import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminDto } from './dto/admin.dto';
import { v4 } from 'uuid';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async findById(id: string): Promise<Admin | undefined> {
    try {
      return await this.adminRepo.findOne({ where: { id } });
    } catch (error) {
      console.error('Error finding admin by ID:', error);
    }
  }

  async findAll(): Promise<Admin[] | undefined> {
    try {
      return this.adminRepo.find();
    } catch (error) {
      console.log('Error finding Admins', error);
    }
  }

  async removeAdmin(id: string): Promise<boolean> {
    try {
      const findAdmin = await this.findById(id);
      if (!findAdmin) return false;
      await this.adminRepo.remove(findAdmin);
      return true;
    } catch (error) {
      console.error(`Error removing admin`, error);
      return false;
    }
  }

  async create(admin: AdminDto): Promise<Admin> {
    try {
      const create = await this.adminRepo.create({
        id: v4(),
        username: admin.username,
        password: admin.password,
      });
      return this.adminRepo.save(create);
    } catch (error) {
      console.log('Unable to create admin', 500);
    }
  }
  async findByUserName(username: string): Promise<Admin> {
    try {
      const admin = await this.adminRepo.findOne({
        where: {
          username,
        },
        select: ['username', 'password', 'role', 'id'],
      });
      return admin;
    } catch (error) {
      console.log(`Unable to find Admin`, error);
    }
  }
}
