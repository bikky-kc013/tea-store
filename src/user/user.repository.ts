import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { uuid } from 'uuidv4';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  //Get user by id
  getById = async (id: string) => {
    try {
      const data = await this.userRepository.findOne({ where: { id: id } });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  //Get all the users
  getAll = async () => {
    try {
      const datas = await this.userRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return datas;
    } catch (error) {
      console.log(error);
    }
  };

  //delete user
  delete = async (user: User) => {
    try {
      await this.userRepository.delete(user);
    } catch (error) {
      console.log(error);
    }
  };

  //Get user by email
  getByEmail = async (email: string) => {
    try {
      const data = await this.userRepository.findOne({
        where: { email: email },
        select: [
          'password',
          'createdAt',
          'email',
          'fullName',
          'id',
          'phoneNumber',
          'updatedAt',
        ],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //Get By Phone Number
  getByPhone = async (number: string) => {
    try {
      const data = await this.userRepository.findOne({
        where: { phoneNumber: number },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  //create user
  createUser = async (data: User) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await this.userRepository.create({
        id: uuid(),
        fullName: data.fullName,
        password: hash,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  };
}
