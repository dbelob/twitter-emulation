import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidationService } from "../../shared/services/validation.service";
import { TweetService } from "../../shared/services/tweet.service";

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html'
})
export class NewTweetComponent {
  public formSubmitted: boolean = false;
  public text: string;

  constructor(private tweetService: TweetService, private validationService: ValidationService, private router: Router) {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.tweetService.tweet(this.text)
        .subscribe(data => {
          this.router.navigateByUrl('/account/show');
        });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
