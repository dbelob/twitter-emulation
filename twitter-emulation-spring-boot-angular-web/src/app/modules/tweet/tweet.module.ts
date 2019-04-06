import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from "./new-tweet.component";
import { FormsModule } from "@angular/forms";
import { MessageModule } from "../message/message.module";
import { RouterModule } from "@angular/router";
import { GeneralModule } from "../general/general.module";

@NgModule({
  declarations: [
    NewTweetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GeneralModule,
    MessageModule
  ]
})
export class TweetModule {
}
