import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Tweet } from "../../models/tweet.model";
import { ValidationService } from "../../services/validation.service";

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html'
})
export class NewTweetComponent implements OnInit {
  formSubmitted: boolean = false;
  newTweet: Tweet = new Tweet();

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
  }

  tweet(tweet: Tweet) {
    //TODO: implement
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.tweet(this.newTweet);
      this.newTweet = new Tweet();
      form.reset();
      this.formSubmitted = false;
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
