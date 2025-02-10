import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('user')
export class LoginController {
    constructor(private authService:AuthService) {}

    @Post('login')
    async userLogin(@Body() body): Promise<any> {
        const {email, password, CLIENT_PUBLIC_IP} = body;
        if (!email || !password) {
            throw new Error('Invalid request. Required fields are email, password');
        }

        const user = await this.authService.userLogin(email, password, CLIENT_PUBLIC_IP).catch((error) => {
            console.log("Error:",error.message);
            throw new Error(error.message);
        });

        return {
            message: 'User logged in',
            user
        };
    }
}
