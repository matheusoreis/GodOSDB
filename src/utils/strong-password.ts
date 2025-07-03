import { IsStrongPassword, ValidationOptions } from 'class-validator';

export function IsCommonStrongPassword(validationOptions?: ValidationOptions) {
  const passwordRules = {
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  };

  const passwordMessage =
    'A senha deve ter no mínimo 6 caracteres, com letras maiúsculas, minúsculas e números.';

  return IsStrongPassword(passwordRules, {
    message: passwordMessage,
    ...validationOptions,
  });
}
