import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MessageService } from '../message/message.service';
import { StatusInfoComponent } from './status-info.component';
import { UserState } from '../../shared/models/user-state.model';

@Component({
    template: `<app-status-info [userState]="userState"></app-status-info>`,
    standalone: false
})
class TestComponent {
  public userState: UserState = new UserState();

  @ViewChild(StatusInfoComponent, {static: true})
  statusInfoComponent: StatusInfoComponent;
}

describe('StatusInfoComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: StatusInfoComponent;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatusInfoComponent, TestComponent],
      providers: [MessageService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.statusInfoComponent;
    debugElement = fixture.debugElement.query(By.directive(StatusInfoComponent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('receives the user state through input property', () => {
    expect(component.userState.authenticatedUserName).toBeUndefined();
    expect(component.userState.selectedUserName).toBeUndefined();
    expect(component.isStateVisible()).toBe(false);
    expect(debugElement.query(By.css("div[id=logged]"))).toBeNull();
    expect(debugElement.query(By.css("span[id=username]"))).toBeNull();

    component.userState = new UserState('jsmith', 'jsmith');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jsmith');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=logged]"))).not.toBeNull();
    expect(debugElement.query(By.css("span[id=username]")).nativeElement.textContent).toEqual('jsmith');

    component.userState = new UserState('jsmith', 'jdoe');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jsmith');
    expect(component.userState.selectedUserName).toBe('jdoe');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=logged]"))).not.toBeNull();
    expect(debugElement.query(By.css("span[id=username]")).nativeElement.textContent).toEqual('jsmith');

    component.userState = new UserState('jdoe', 'jdoe');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jdoe');
    expect(component.userState.selectedUserName).toBe('jdoe');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=logged]"))).not.toBeNull();
    expect(debugElement.query(By.css("span[id=username]")).nativeElement.textContent).toEqual('jdoe');

    component.userState = new UserState('jdoe', 'jsmith');
    fixture.detectChanges();
    expect(component.userState.authenticatedUserName).toBe('jdoe');
    expect(component.userState.selectedUserName).toBe('jsmith');
    expect(component.isStateVisible()).toBe(true);
    expect(debugElement.query(By.css("div[id=logged]"))).not.toBeNull();
    expect(debugElement.query(By.css("span[id=username]")).nativeElement.textContent).toEqual('jdoe');
  });
});
