import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-non-validation-message',
    templateUrl: './non-validation-message.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class NonValidationMessageComponent {
  @Input() public isFormSubmitted: boolean;
  @Input() public isFormValid: boolean | null;
}
