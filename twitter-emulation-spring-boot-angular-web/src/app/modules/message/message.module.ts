import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";
import { NonValidationMessageComponent } from './non-validation-message.component';

@NgModule({
  declarations: [MessageComponent, NonValidationMessageComponent],
  imports: [CommonModule],
  providers: [MessageService],
  exports: [MessageComponent, NonValidationMessageComponent]
})
export class MessageModule {
}
