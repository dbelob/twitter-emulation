import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTweetComponent } from "./new-tweet.component";
import { FormsModule } from "@angular/forms";
import { MessageModule } from "../message/message.module";

@NgModule({
  declarations: [
    NewTweetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessageModule
  ]
})
export class TweetModule {
}
