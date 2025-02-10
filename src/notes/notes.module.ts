import { Module } from '@nestjs/common';
import { GetAllController } from './get-all/get-all.controller';
import { NotesService } from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.identity';
import { CreateController } from './create/create.controller';
import { UpdateDeleteController } from './update-delete/update-delete.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [GetAllController, CreateController, UpdateDeleteController],
  providers: [NotesService]
})
export class NotesModule {}
