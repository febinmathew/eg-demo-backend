import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from 'common/decorators/request-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('user-data')
  getUserData(
    @RequestUser('email') userEmail: string,
  ): Promise<Record<string, string>> {
    return this.userService.getUserData(userEmail);
  }
}
