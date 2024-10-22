import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {
  @Input('appValidateEqual') validated: string;

  validate(control: AbstractControl): ValidationErrors | null {
    const v = control.value;
    const e = control.root.get(this.validated);

    return (e && v !== e.value) ? {appValidateEqual: {validated: this.validated}} : null;
  }
}
