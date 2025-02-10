import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.identity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async createUser(user: User): Promise<User> {

        const userExists = await this.getUserByEmail(user.email);

        if (userExists) {
            throw new Error('User already exists with this email');
        }

        return await this.userRepository.save(user);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {email}
        });
    }

    async userLogin(email: string, password: string, ip: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        if(!user || user.password !== password) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
}
