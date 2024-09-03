import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import PasswordConstraint from 'common/validators/PasswordConstraint';
import { SignInDto } from './SignIn.dto';

export default class CreateUserDto extends SignInDto {
  @IsNotEmpty()
  name: string;
}
