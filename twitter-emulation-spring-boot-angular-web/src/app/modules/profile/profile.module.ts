import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { DeleteAccountComponent } from './delete-account.component';
import { MessageModule } from '../message/message.module';
import { GeneralModule } from '../general/general.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GeneralModule,
        MessageModule,
        DeleteAccountComponent,
        ProfileComponent
    ]
})
export class ProfileModule {
}
