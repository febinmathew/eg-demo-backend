import { IsNotEmpty } from 'class-validator';

import { SignInDto } from './SignIn.dto';

export default class CreateUserDto extends SignInDto {
  @IsNotEmpty()
  name: string;
}
