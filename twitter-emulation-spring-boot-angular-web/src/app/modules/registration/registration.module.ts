import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from "./registration.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MessageModule } from "../message/message.module";
import { GeneralModule } from "../general/general.module";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GeneralModule,
    MessageModule
  ]
})
export class RegistrationModule {
}
