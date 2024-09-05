import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/CreateUser.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 2, ttl: 5000 } })
  @Post('login')
  loginUser(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('register')
  registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Record<string, any>> {
    return this.authService.createUser(createUserDto);
  }
}
