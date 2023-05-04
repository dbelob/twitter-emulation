import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info.component';
import { SearchComponent } from './search.component';
import { StatusInfoComponent } from './status-info.component';
import { TopBarComponent } from './top-bar.component';
import { MessageModule } from '../message/message.module';
import { HomeComponent } from './home.component';
import { HomeAccountComponent } from './home-account.component';
import { HomeTweetsComponent } from './home-tweets.component';
import { TweetsComponent } from './tweets.component';
import { FollowersComponent } from './followers.component';
import { FollowingComponent } from './following.component';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    HomeComponent,
    HomeAccountComponent,
    HomeTweetsComponent,
    TweetsComponent,
    FollowingComponent,
    FollowersComponent,
    SearchComponent,
    StatusInfoComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MessageModule
  ],
  providers: [{provide: USER_STATE, useValue: new Subject<UserState>()}]
})
export class HomeModule {
}
