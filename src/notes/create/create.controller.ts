import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { NotesService } from '../notes.service';

@Controller('notes')
export class CreateController {
    constructor(private notesService: NotesService) {}

    @Post('create')
    async createNote(@Body() body: any): Promise<any> {
        const { CLIENT_IDENTITY, title, description } = body;
        const userId = CLIENT_IDENTITY.userId;

        if (!title || !description) {
            throw new HttpException('Invalid request. Required fields are title, description', HttpStatus.BAD_REQUEST);
        }

        const note = await this.notesService.createNote(userId, title, description).catch((error) => {
            console.log('Error:', error.message);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });

        console.log('Note:', note);

        return {
            message: 'Note created',
            note,
        };

    }
}
