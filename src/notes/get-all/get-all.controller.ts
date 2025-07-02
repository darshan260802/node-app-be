import { Body, Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { NotesService } from '../notes.service';

@Controller('notes')
export class GetAllController {
  constructor(private notesService: NotesService) {}

  @Get('get-all')
  async getAllNotes(@Body() body: any): Promise<any> {
    const { CLIENT_IDENTITY } = body;
    const userId = CLIENT_IDENTITY.userId;

    const notes = await this.notesService.getAllNotes(userId).catch((error) => {
      console.log('Error:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });

    console.log('Notes:', notes);

    return {
      message: 'All notes',
      notes,
    };
  }

  @Get('get')
  async getNote(@Body() body: any): Promise<any> {
    const { CLIENT_IDENTITY, noteId } = body;
    const userId = CLIENT_IDENTITY.userId;

    const note = await this.notesService.getNote(userId, noteId).catch((error) => {
      console.log('Error:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });

    return {
      message: note ?  'Note Found' : 'Note not found',
      note,
    };
  }

}
