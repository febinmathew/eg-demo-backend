import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';

@Injectable()
export class AuthService {
    createUser(createUserDto: CreateUserDto) {
        return 'New user created';
    }
}
