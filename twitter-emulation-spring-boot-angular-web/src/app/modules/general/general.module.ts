import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidatorDirective } from './equal-validator.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  declarations: [
    EqualValidatorDirective,
    AutofocusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EqualValidatorDirective,
    AutofocusDirective]
})
export class GeneralModule {
}
