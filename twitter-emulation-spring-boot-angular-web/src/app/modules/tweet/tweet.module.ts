import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewTweetComponent } from './new-tweet.component';
import { MessageModule } from '../message/message.module';
import { GeneralModule } from '../general/general.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GeneralModule,
        MessageModule,
        NewTweetComponent
    ]
})
export class TweetModule {
}
