import { Component, DebugElement, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../message/message.service';
import { AccountInfoComponent } from './account-info.component';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { UserState } from '../../shared/models/user-state.model';

@Component({
  template: `
    <app-account-info [userState]="userState" [accountStatistics]="accountStatistics"></app-account-info>`
})
class TestComponent {
  public userState: UserState = new UserState();
  public accountStatistics: AccountStatistics = new AccountStatistics();

  @ViewChild(AccountInfoComponent, {static: true})
  accountInfoComponent: AccountInfoComponent;
}

describe('AccountInfoComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: AccountInfoComponent;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoComponent, TestComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [MessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.accountInfoComponent;
    debugElement = fixture.debugElement.query(By.directive(AccountInfoComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('receives the account statistics through input property', () => {
    expect(component.accountStatistics.username).toBeUndefined();
    expect(component.accountStatistics.description).toBeUndefined();
    expect(debugElement.query(By.css("div[id=username]")).nativeElement.textContent).toContain('@');
    expect(debugElement.query(By.css("div[id=description]")).nativeElement.textContent.trim()).toBe('');

    component.accountStatistics = new AccountStatistics('jsmith', 'John Smith');
    fixture.detectChanges();
    expect(component.accountStatistics.username).toBe('jsmith');
    expect(component.accountStatistics.description).toBe('John Smith');
    expect(debugElement.query(By.css("div[id=username]")).nativeElement.textContent).toContain('@jsmith');
    expect(debugElement.query(By.css("div[id=description]")).nativeElement.textContent).toContain('John Smith');
  });
});
