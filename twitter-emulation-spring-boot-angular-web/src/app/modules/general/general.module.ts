import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidatorDirective } from './equal-validator.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
    imports: [
        CommonModule,
        EqualValidatorDirective,
        AutofocusDirective
    ],
    exports: [
        EqualValidatorDirective,
        AutofocusDirective
    ]
})
export class GeneralModule {
}
