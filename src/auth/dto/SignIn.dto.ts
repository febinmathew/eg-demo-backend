import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import PasswordConstraint from 'common/validators/PasswordConstraint';

export class SignInDto {
  @IsEmail({}, { message: 'Invalid email address' })
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
