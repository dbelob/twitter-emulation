import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from "./registration.component";
import { FormsModule } from "@angular/forms";
import { MessageModule } from "../message/message.module";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessageModule
  ]
})
export class RegistrationModule {
}
