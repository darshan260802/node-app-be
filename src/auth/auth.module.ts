import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.identity';
import { LoginController } from './login/login.controller';
import { Session } from 'src/entities/session.identity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  controllers: [SignupController, LoginController],
  providers: [AuthService]
})
export class AuthModule {}
