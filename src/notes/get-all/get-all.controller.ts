import { Body, Controller, Get } from '@nestjs/common';
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
      throw new Error(error.message);
    });

    console.log('Notes:', notes);

    return {
      message: 'All notes',
      notes,
    };
  }
}
