import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TweetService } from '../../shared/services/tweet.service';
import { NonValidationMessageComponent } from '../message/non-validation-message.component';
import { ValidationMessagesComponent } from '../message/validation-messages.component';
import { AutofocusDirective } from '../general/autofocus.directive';

@Component({
    selector: 'app-new-tweet',
    templateUrl: './new-tweet.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, NonValidationMessageComponent, ValidationMessagesComponent, AutofocusDirective, RouterLink]
})
export class NewTweetComponent {
  public formSubmitted = false;
  public text: string;

  constructor(private tweetService: TweetService, private router: Router) {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.tweetService.tweet(this.text)
        .subscribe(() => {
          this.router.navigateByUrl('/account/show');
        });
    }
  }
}
