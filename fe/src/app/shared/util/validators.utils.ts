import { AbstractControl, ValidationErrors } from '@angular/forms';

export function createPasswordComparisonValidator(
  controlOne: AbstractControl | null,
  controlTwo: AbstractControl | null
) {
  return () => {
    if (controlOne?.value !== controlTwo?.value)
      return { 'password-match': true };
    return null;
  };
}

export function createUrlValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    try {
      const url = new URL(value);

      // only accept http[s]
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return { url: true };
      }

      return null;
    } catch (err) {
      return { url: true };
    }
  };
}
