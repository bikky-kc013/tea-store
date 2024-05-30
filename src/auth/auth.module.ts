import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { refreshJwtStrategy } from './strategies/refresh.strategy';

console.log(process.env.JWT_SECRET);

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, refreshJwtStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
