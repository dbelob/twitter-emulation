import {Component} from '@angular/core';
import {Tweet} from '../model/tweet.model';
import {TweetRepository} from '../model/tweet.repository';

@Component({
  selector: 'app-store',
  templateUrl: 'store.component.html'
})
export class StoreComponent {
  constructor(private repository: TweetRepository) {
  }

  get tweets(): Tweet[] {
    return this.repository.getTweets();
  }
}
