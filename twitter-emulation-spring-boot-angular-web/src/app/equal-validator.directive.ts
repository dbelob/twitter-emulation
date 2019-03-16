import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[validateEqual]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective implements Validator {
  @Input('validateEqual') validated: string;

  validate(control: AbstractControl): ValidationErrors | null {
    let v = control.value;
    let e = control.root.get(this.validated);

    return (e && v !== e.value) ? {"validateEqual": {"validated": this.validated}} : null;
  }
}
