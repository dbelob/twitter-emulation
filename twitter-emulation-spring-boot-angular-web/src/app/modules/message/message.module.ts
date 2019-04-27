import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule],
  providers: [MessageService],
  exports: [MessageComponent]
})
export class MessageModule {
}
