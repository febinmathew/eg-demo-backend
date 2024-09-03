import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
