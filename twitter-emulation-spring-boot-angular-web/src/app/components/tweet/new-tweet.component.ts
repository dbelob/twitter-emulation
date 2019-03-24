import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ValidationService } from "../../services/validation.service";
import { TweetService } from "../../services/tweet.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html'
})
export class NewTweetComponent implements OnInit {
  formSubmitted: boolean = false;
  text: string;

  constructor(private tweetService: TweetService, private validationService: ValidationService, private router: Router) {
  }

  ngOnInit() {
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      this.tweetService.tweet(this.text).subscribe(data => {
        this.router.navigateByUrl('/account/show');
      });
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    return this.validationService.getFormValidationMessages(form);
  }
}
