import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, DebugElement, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../message/message.service';
import { FollowComponent } from './follow.component';
import { UserState } from '../../shared/models/user-state.model';
import { AccountStatistics } from '../../shared/models/account-statistics.model';

@Component({
  template: `
    <app-follow [userState]="userState" [accountStatistics]="accountStatistics"></app-follow>`
})
class TestComponent {
  public userState: UserState = new UserState();
  public accountStatistics: AccountStatistics = new AccountStatistics();

  @ViewChild(FollowComponent, {static: true})
  followComponent: FollowComponent;
}

describe('FollowComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: FollowComponent;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FollowComponent, TestComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [MessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.followComponent;
    debugElement = fixture.debugElement.query(By.directive(FollowComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('receives the user state through input property', () => {
    expect(component.userState.authenticatedUserName).toBeUndefined();
    expect(component.userState.selectedUserName).toBeUndefined();
    expect(component.isStateVisible()).toBe(false);
    expect(debugElement.query(By.css("div[id=state]"))).toBeNull();

    component.userState = new UserState('jsmith', 'jsmith');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jsmith');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=state]"))).not.toBeNull();

    component.userState = new UserState('jsmith', 'jdoe');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jdoe');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=state]"))).not.toBeNull();
  });
});
