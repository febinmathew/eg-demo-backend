import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

interface PasswordConstraintArg {
  minLetters?: number;
  minNumbers?: number;
  minSpecialCharacters?: number;
}
@ValidatorConstraint({ name: 'PasswordConstraint', async: false })
export default class PasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    const constraints: PasswordConstraintArg = args.constraints[0];
    let validationAllow = true;
    if (constraints.minLetters) {
      validationAllow = validationAllow && /[a-zA-Z]/.test(text.trim());
    }
    if (constraints.minNumbers) {
      validationAllow = validationAllow && /\d/.test(text.trim());
    }
    if (constraints.minSpecialCharacters) {
      validationAllow =
        validationAllow && /[!@#$%^&*(),.?":{}|<>]/.test(text.trim());
    }
    return validationAllow;
  }

  defaultMessage(args: ValidationArguments) {
    return `The '${args.property}' field must include a letter, a number, and a special character`;
  }
}
