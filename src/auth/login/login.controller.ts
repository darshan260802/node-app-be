import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('user')
export class LoginController {
    constructor(private authService:AuthService) {}

    @Post('login')
    async userLogin(@Body() body): Promise<any> {
        const {email, password, CLIENT_PUBLIC_IP} = body;
        if (!email || !password) {
            throw new HttpException('Invalid request. Required fields are email, password', HttpStatus.BAD_REQUEST);
        }

        const user = await this.authService.userLogin(email, password, CLIENT_PUBLIC_IP).catch((error) => {
            console.log("Error:",error.message);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });

        return {
            message: 'User logged in',
            user
        };
    }

    @Get('logout')
    async userLogout(@Body() body: any): Promise<any> {

        const { CLIENT_PUBLIC_IP } = body;

        const loggedOut = await this.authService.userLogout(CLIENT_PUBLIC_IP).catch((error) => {
            console.log("Error:",error.message);
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        });

        if (!loggedOut) {
            throw new HttpException('User not logged in' , HttpStatus.BAD_REQUEST);
        }

        return {
            message: 'User logged out'
        };
    }
}
