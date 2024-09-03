import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 1, ttl: 5000 } })
  @Post('login')
  loginUser(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }
}
