import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.identity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignupController],
  providers: [AuthService]
})
export class AuthModule {}
