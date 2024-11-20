import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-non-validation-message',
    templateUrl: './non-validation-message.component.html',
    standalone: false
})
export class NonValidationMessageComponent {
  @Input() public isFormSubmitted: boolean;
  @Input() public isFormValid: boolean;
}
