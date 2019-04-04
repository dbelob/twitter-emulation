import { NgModule } from "@angular/core";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule],
  providers: [MessageService],
  exports: [MessageComponent]
})
export class MessageModule {
}
