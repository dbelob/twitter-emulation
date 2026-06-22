import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessageComponent } from './message.component';

@Component({
    selector: 'app-non-validation-message',
    templateUrl: './non-validation-message.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MessageComponent]
})
export class NonValidationMessageComponent {
  @Input() public isFormSubmitted: boolean;
  @Input() public isFormValid: boolean | null;
}
