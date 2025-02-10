import { Module } from '@nestjs/common';
import { GetAllController } from './get-all/get-all.controller';

@Module({
  controllers: [GetAllController]
})
export class NotesModule {}
