import {NgModule} from '@angular/core';
import {TweetRepository} from './tweet.repository';
import {StaticDataSource} from './static.datasource';
import {RestDataSource} from './rest.datasource';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [HttpClientModule],
  providers: [TweetRepository,
    {provide: StaticDataSource, useClass: RestDataSource}]
})
export class ModelModule {
}
