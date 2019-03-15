import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[appPasswordsMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordsMatchDirective, multi: true}]
})
export class PasswordsMatchDirective implements Validator {
  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return {"passwordsMatch": {"valid": false}};
  }
}
