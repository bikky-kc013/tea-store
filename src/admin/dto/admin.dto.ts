import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username should not be empty' })
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(20, {
    message: 'Username must be less than or equal to 20 characters long',
  })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, {
    message: 'Password must be less than or equal to 50 characters long',
  })
  password: string;
}
