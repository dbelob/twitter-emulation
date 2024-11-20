import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from '../../shared/services/tweet.service';

@Component({
    selector: 'app-new-tweet',
    templateUrl: './new-tweet.component.html',
    standalone: false
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
