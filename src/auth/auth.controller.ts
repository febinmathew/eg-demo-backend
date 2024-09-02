import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){

    }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
