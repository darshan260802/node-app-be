import { Body, Controller, Post } from '@nestjs/common';
import { NotesService } from '../notes.service';

@Controller('notes')
export class CreateController {
    constructor(private notesService: NotesService) {}

    @Post('create')
    async createNote(@Body() body: any): Promise<any> {
        const { CLIENT_IDENTITY, title, description } = body;
        const userId = CLIENT_IDENTITY.userId;

        if (!title || !description) {
            throw new Error('Invalid request. Required fields are title, description');
        }

        const note = await this.notesService.createNote(userId, title, description).catch((error) => {
            console.log('Error:', error.message);
            throw new Error(error.message);
        });

        console.log('Note:', note);

        return {
            message: 'Note created',
            note,
        };

    }
}
