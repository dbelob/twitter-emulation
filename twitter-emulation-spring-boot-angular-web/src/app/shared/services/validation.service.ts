import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor() {
  }

  static getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];

    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push(`You must enter a ${thing}`);
            break;
          case "minlength":
            messages.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
            break;
          case "maxlength":
            messages.push(`A ${thing} must be no more than ${state.errors['maxlength'].requiredLength} characters`);
            break;
          case "pattern":
            messages.push(`The ${thing} contains illegal characters`);
            break;
          case "appValidateEqual":
            messages.push(`A ${state.errors['appValidateEqual'].validated} and ${thing} must be the same`);
            break;
        }
      }
    }

    return messages;
  }

  getFormValidationMessages(form: NgForm): string[] {
    let messages: string[] = [];

    Object.keys(form.controls).forEach(k => {
      ValidationService.getValidationMessages(form.controls[k], k)
        .forEach(m => messages.push(m));
    });

    return messages;
  }
}
