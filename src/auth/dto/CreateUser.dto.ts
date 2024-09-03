import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import PasswordConstraint from 'common/validators/PasswordConstraint';

export default class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(64)
  @Validate(PasswordConstraint, [
    {
      minLetters: 1,
      minNumbers: 1,
      minSpecialCharacters: 1,
    },
  ])
  password: string;
}
