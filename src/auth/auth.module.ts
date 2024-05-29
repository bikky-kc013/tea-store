import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../../src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'bikky@123333333',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
