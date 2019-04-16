import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AccountComponent } from "./account.component";
import { AccountInfoComponent } from "./account-info.component";
import { FollowComponent } from "./follow.component";
import { SearchComponent } from "./search.component";
import { TopBarComponent } from "./top-bar.component";
import { MessageModule } from "../message/message.module";
import { HomeComponent } from "./home.component";
import { HomeAccountComponent } from "./home-account.component";
import { HomeTweetsComponent } from "./home-tweets.component";

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent,
    FollowComponent,
    HomeComponent,
    HomeAccountComponent,
    HomeTweetsComponent,
    SearchComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MessageModule
  ]
})
export class HomeModule {
}
