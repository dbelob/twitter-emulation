import {NgModule} from '@angular/core';
import {TweetRepository} from './tweet.repository';
import {StaticDataSource} from './static.datasource';

@NgModule({
  providers: [TweetRepository, StaticDataSource]
})
export class ModelModule {
}
