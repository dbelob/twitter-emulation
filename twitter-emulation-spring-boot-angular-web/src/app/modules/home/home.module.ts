import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Subject } from "rxjs";
import { AccountComponent } from "./account.component";
import { AccountInfoComponent } from "./account-info.component";
import { FollowComponent } from "./follow.component";
import { SearchComponent } from "./search.component";
import { TopBarComponent } from "./top-bar.component";
import { MessageModule } from "../message/message.module";
import { HomeComponent } from "./home.component";
import { HomeAccountComponent } from "./home-account.component";
import { HomeTweetsComponent } from "./home-tweets.component";
import { TweetsComponent } from "./tweets.component";
import { FollowersComponent } from "./followers.component";
import { FollowingComponent } from "./following.component";
import { HomeChildComponent } from "./home-child.component";
import { DATA_USERNAME } from "../../shared/models/user.model";

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    FollowComponent,
    HomeComponent,
    HomeChildComponent,
    HomeAccountComponent,
    HomeTweetsComponent,
    TweetsComponent,
    FollowingComponent,
    FollowersComponent,
    SearchComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MessageModule
  ],
  providers: [{provide: DATA_USERNAME, useValue: new Subject<string>()}]
})
export class HomeModule {
}
