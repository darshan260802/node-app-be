import { Module } from '@nestjs/common';
import { SignupController } from './signup/signup.controller';

@Module({
  controllers: [SignupController]
})
export class AuthModule {}
