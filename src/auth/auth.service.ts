import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { error } from 'console';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
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
}
