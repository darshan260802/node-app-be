import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { NotesService } from '../notes.service';

@Controller('notes')
export class UpdateDeleteController {
    constructor(private notesService: NotesService) {}

    @Post('update')
    async updateNote(@Body() body: any): Promise<any> {
        const { CLIENT_IDENTITY, noteId, title, description, isComplete } = body;
        const userId = CLIENT_IDENTITY.userId;

        if (!noteId) {
            throw new HttpException('Invalid request. Required fields are noteId', HttpStatus.BAD_REQUEST);
        }

        const note = await this.notesService.updateNote(userId, noteId, title, description, isComplete).catch((error) => {
            console.log('Error:', error.message);
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        });


        return {
            message: 'Note updated',
        };
    }

    @Post('delete')
    async deleteNote(@Body() body: any): Promise<any> {
        const { CLIENT_IDENTITY, noteId } = body;
        const userId = CLIENT_IDENTITY.userId;

        if (!noteId) {
            throw new HttpException('Invalid request. Required fields are noteId' , HttpStatus.BAD_REQUEST);
        }

        await this.notesService.deleteNote(userId, noteId).catch((error) => {
            console.log('Error:', error.message);
            throw new HttpException(error.message , HttpStatus.BAD_REQUEST);
        });

        return {
            message: 'Note deleted',
        };
    }
}
