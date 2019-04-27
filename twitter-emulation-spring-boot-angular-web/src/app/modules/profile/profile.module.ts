import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "./profile.component";
import { DeleteAccountComponent } from "./delete-account.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MessageModule } from "../message/message.module";

@NgModule({
  declarations: [
    DeleteAccountComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MessageModule
  ]
})
export class ProfileModule {
}
