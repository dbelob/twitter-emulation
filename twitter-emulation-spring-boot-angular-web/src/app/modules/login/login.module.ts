import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { GeneralModule } from "../general/general.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GeneralModule
  ]
})
export class LoginModule {
}
