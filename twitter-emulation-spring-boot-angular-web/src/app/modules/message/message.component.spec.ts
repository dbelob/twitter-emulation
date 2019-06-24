import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MessageService } from "./message.service";
import { Message } from "./message.model";

describe('MessagesComponent', () => {
  let fixture: ComponentFixture<MessageComponent>;
  let component: MessageComponent;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [MessageService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    messageService = TestBed.get(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checks visibility', () => {
    expect(component.isVisible()).toBe(false);

    messageService.reportMessage(new Message('Message', new Date(), true));
    expect(component.isVisible()).toBe(true);
  });
});
