import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, DebugElement, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { MessageService } from '../message/message.service';
import { AccountInfoComponent } from './account-info.component';
import { AccountStatistics } from '../../shared/models/account-statistics.model';
import { UserState } from '../../shared/models/user-state.model';

@Component({
    template: `<app-account-info [userState]="userState" [accountStatistics]="accountStatistics"></app-account-info>`,
    standalone: false
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
      imports: [HttpClientModule],
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

  it('receives the user state through input property', () => {
    expect(component.userState.authenticatedUserName).toBeUndefined();
    expect(component.userState.selectedUserName).toBeUndefined();
    expect(component.isFollowVisible()).toBe(false);
    expect(debugElement.query(By.css("div[id=buttons]"))).toBeNull();

    component.userState = new UserState('jsmith', 'jsmith');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jsmith');
    expect(component.isFollowVisible()).toBe(false);
    expect(debugElement.query(By.css("div[id=buttons]"))).toBeNull();

    component.userState = new UserState('jsmith', 'jdoe');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jdoe');
    expect(component.isFollowVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=buttons]"))).not.toBeNull();
  });

  it('receives the account statistics through input property', () => {
    expect(component.accountStatistics.username).toBeUndefined();
    expect(component.accountStatistics.description).toBeUndefined();
    expect(debugElement.query(By.css("div[id=username]")).nativeElement.textContent).toContain('@');
    expect(debugElement.query(By.css("div[id=description]")).nativeElement.textContent.trim()).toBe('');

    component.accountStatistics = new AccountStatistics('jsmith', 'John Smith', 6, 2, 1);
    fixture.detectChanges();
    expect(component.accountStatistics.description).toBe('John Smith');
    expect(component.accountStatistics.username).toBe('jsmith');
    expect(debugElement.query(By.css("div[id=username]")).nativeElement.textContent).toEqual('@jsmith');
    expect(debugElement.query(By.css("div[id=description]")).nativeElement.textContent).toEqual('John Smith');
    expect(debugElement.query(By.css("a[id=tweets]")).nativeElement.textContent).toEqual('6');
    expect(debugElement.query(By.css("a[id=following]")).nativeElement.textContent).toEqual('2');
    expect(debugElement.query(By.css("a[id=followers]")).nativeElement.textContent).toEqual('1');

    component.accountStatistics = new AccountStatistics('jdoe', 'John Doe', 3, 1, 1);
    fixture.detectChanges();
    expect(component.accountStatistics.username).toBe('jdoe');
    expect(component.accountStatistics.description).toBe('John Doe');
    expect(debugElement.query(By.css("div[id=username]")).nativeElement.textContent).toEqual('@jdoe');
    expect(debugElement.query(By.css("div[id=description]")).nativeElement.textContent).toEqual('John Doe');
    expect(debugElement.query(By.css("a[id=tweets]")).nativeElement.textContent).toEqual('3');
    expect(debugElement.query(By.css("a[id=following]")).nativeElement.textContent).toEqual('1');
    expect(debugElement.query(By.css("a[id=followers]")).nativeElement.textContent).toEqual('1');
  });

  it('receives the account statistics and user state through input property', () => {
    expect(component.userState.authenticatedUserName).toBeUndefined();
    expect(component.userState.selectedUserName).toBeUndefined();
    expect(component.accountStatistics.follow).toBeUndefined();
    expect(debugElement.query(By.css("button[id=follow]"))).toBeNull();
    expect(debugElement.query(By.css("button[id=unfollow]"))).toBeNull();

    component.accountStatistics = new AccountStatistics(undefined, undefined, undefined, undefined, undefined, true);
    fixture.detectChanges();
    expect(component.accountStatistics.follow).toBe(true);
    expect(debugElement.query(By.css("button[id=follow]"))).toBeNull();
    expect(debugElement.query(By.css("button[id=unfollow]"))).toBeNull();

    component.userState = new UserState('jsmith', 'jdoe');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jdoe');
    expect(debugElement.query(By.css("button[id=follow]"))).toBeNull();
    expect(debugElement.query(By.css("button[id=unfollow]"))).not.toBeNull();

    component.accountStatistics = new AccountStatistics(undefined, undefined, undefined, undefined, undefined, false);
    fixture.detectChanges();
    expect(component.accountStatistics.follow).toBe(false);
    expect(debugElement.query(By.css("button[id=follow]"))).not.toBeNull();
    expect(debugElement.query(By.css("button[id=unfollow]"))).toBeNull();
  });
});
