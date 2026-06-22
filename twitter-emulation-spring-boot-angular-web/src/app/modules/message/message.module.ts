import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { NonValidationMessageComponent } from './non-validation-message.component';
import { ValidationMessagesComponent } from './validation-messages.component';

@NgModule({
    imports: [CommonModule, MessageComponent,
        NonValidationMessageComponent,
        ValidationMessagesComponent],
    providers: [MessageService],
    exports: [
        MessageComponent,
        NonValidationMessageComponent,
        ValidationMessagesComponent
    ]
})
export class MessageModule {
}
