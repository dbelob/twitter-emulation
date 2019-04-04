import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "./profile.component";
import { DeleteAccountComponent } from "./delete-account.component";
import { MessageModule } from "../message/message.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DeleteAccountComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessageModule
  ]
})
export class ProfileModule {
}
