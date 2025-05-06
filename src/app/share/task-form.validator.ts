import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class TaskFormValidator {
  static forbiddenWordsValidator(words: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || typeof control.value !== 'string') {
        return null;
      }

      const hasForbiddenWord: boolean = words.some((word: string) =>
        control.value.includes(word.toLowerCase())
      );

      return hasForbiddenWord ? { forbiddenWord: true } : null;
    };
  }

  static dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const inputDate = new Date(control.value);
    const currentYear: number = new Date().getFullYear();

    return inputDate.getFullYear() < currentYear ? { dateVal: true } : null;
  };
}
