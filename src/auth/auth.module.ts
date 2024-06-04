import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalUserStrategy } from './strategies/local-user-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { refreshJwtStrategy } from './strategies/refresh.strategy';
import { AdminModule } from '../admin/admin.module';
import { LocalAdminStrategy } from './strategies/local-admin-strategy';

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    AdminModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalUserStrategy,
    LocalAdminStrategy,
    refreshJwtStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
