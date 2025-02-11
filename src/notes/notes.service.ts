import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async createNote(userId: string, title: string, description: string): Promise<Note> {
        return await this.noteRepository.save({
            userId,
            title,
            description,
        });
    }

    async updateNote(userId: string, noteId: string, title: string, description: string): Promise<boolean> {
        const note = await this.noteRepository.findOne({
            where: {id: noteId, userId}
        });

        if(!note) {
            throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
        }

        await this.noteRepository.update(noteId, {
            title,
            description,
        });

        return true;
    }

    async deleteNote(userId: string, noteId: string): Promise<boolean> {
        const note = await this.noteRepository.findOne({
            where: {id: noteId, userId}
        });

        if(!note) {
            throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
        }

        await this.noteRepository.remove(note);

        return true;
    }
}
