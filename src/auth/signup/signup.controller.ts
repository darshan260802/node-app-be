import { Body, Controller, Headers, Post, Req } from '@nestjs/common';

@Controller('user')
export class SignupController {
  @Post('create')
  createUser(@Body() body: any, @Headers() headers: Headers): any {
    // console.log("Request headers: ", req);

    return {
      message: 'User created',
      data: body,
    };
  }
}
