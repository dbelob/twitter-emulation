import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';

@Component({
    selector: 'app-validation-messages',
    templateUrl: './validation-messages.component.html',
    standalone: false
})
export class ValidationMessagesComponent {
  @Input() public isFormSubmitted: boolean;
  @Input() public form: NgForm;

  constructor(private validationService: ValidationService) {
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
