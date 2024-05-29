import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { error } from 'console';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  create = async (data: UserCredentialsDto) => {
    try {
      const existingUser = await this.userService.getUserByEmail(data.email);
      if (existingUser) {
        throw new HttpException(
          {
            status: 409,
            error: 'User with this email is already registred',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      const newUser = await this.userService.createUser(data);
      if (!newUser) {
        throw new HttpException(
          {
            status: 500,
            error: 'Unable to create a new user',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
          {
            cause: error,
          },
        );
      }
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  validateUser = async (email: string, password: string) => {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...data } = user;
        password;
        return data;
      } else {
        throw new HttpException(
          {
            status: '400',
            error: 'Invalid Credentials',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw error;
    }
  };
  login = (user: UserCredentialsDto) => {
    try {
      const payload = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      };
      return {
        ...user,
        accessToken: this.jwt.sign(payload),
      };
    } catch (error) {}
  };
}
