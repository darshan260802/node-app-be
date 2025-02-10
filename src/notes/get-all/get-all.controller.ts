import { Body, Controller, Get } from '@nestjs/common';

@Controller('notes')
export class GetAllController {
    constructor() {}

    @Get('get-all')
    async getAllNotes(@Body() body:any): Promise<any> {
        console.log(body);
        return {
            ok: true
        }
    }
}
