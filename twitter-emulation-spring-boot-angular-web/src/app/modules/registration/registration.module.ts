import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { MessageModule } from '../message/message.module';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessageModule,
    RegistrationComponent
]
})
export class RegistrationModule {
}
