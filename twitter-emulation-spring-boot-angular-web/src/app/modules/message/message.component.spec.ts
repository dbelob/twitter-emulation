import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { Observable, Subject } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

class MockMessageService {
  private subject = new Subject<Message>();

  reportMessage(msg: Message) {
    this.subject.next(msg);
  }

  get messages(): Observable<Message> {
    return this.subject;
  }
}

describe('MessagesComponent', () => {
  let fixture: ComponentFixture<MessageComponent>;
  let component: MessageComponent;
  let messageService: MessageService;
  let mockMessageService = new MockMessageService();
  let debugElement: DebugElement;
  let bindingElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [
        {provide: MessageService, useValue: mockMessageService}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    messageService = TestBed.get(MessageService);
    debugElement = fixture.debugElement;
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

  it('displays message text', () => {
    expect(debugElement.query(By.css("div"))).toBeNull();

    messageService.reportMessage(new Message('Message 1', new Date(), true));
    fixture.detectChanges();
    bindingElement = debugElement.query(By.css("div")).nativeElement;
    expect(bindingElement.textContent).toContain('Message 1');

    messageService.reportMessage(new Message('Message 2', new Date(), true));
    fixture.detectChanges();
    expect(bindingElement.textContent).toContain('Message 2');

    messageService.reportMessage(new Message('Message 3', new Date(), true));
    fixture.detectChanges();
    expect(bindingElement.textContent).toContain('Message 3');
  });
});
