import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.identity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
    constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {

    }

    async getAllNotes(userId: string): Promise<Note[]> {
        return await this.noteRepository.find({
            where: {userId}
        });
    }

}
