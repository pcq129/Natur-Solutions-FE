import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function ConfirmValidator(passwordControl: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent as FormGroup;

    if (!formGroup || !formGroup.controls[passwordControl]) {
      return null;
    }
    const controlToMatch = formGroup.controls[passwordControl];
    const mismatch = controlToMatch.value !== control.value;
    return mismatch ? { mismatch: true } : null;
  };
}
