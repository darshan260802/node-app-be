import { Body, Controller, Headers, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('user')
export class SignupController {

    constructor(private authService: AuthService) {}

  @Post('create')
  async createUser(@Body() body: any): Promise<any> {

    const {name, email, password} = body;
    if (!name || !email || !password) {
        throw new HttpException(`Invalid request. Required fields are name, email, password`, HttpStatus.BAD_REQUEST)
    }

    await this.authService.createUser({name, email, password}).catch((error) => {
        console.log("Error:",error.message);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    });


    return {
      message: 'User created',
    };
  }
}
