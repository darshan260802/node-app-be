import { Module } from '@nestjs/common';
import { GetAllController } from './get-all/get-all.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.identity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [GetAllController],
  providers: [NotesService]
})
export class NotesModule {}
