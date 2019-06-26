import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Component, DebugElement, ViewChild } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AccountInfoComponent } from './account-info.component';
import { AccountStatistics } from "../../shared/models/account-statistics.model";

@Component({
  template: `
    <app-account-info [accountStatistics]="accountStatistics"></app-account-info>`
})
class TestComponent {
  public accountStatistics: AccountStatistics = new AccountStatistics();

  @ViewChild(AccountInfoComponent, {static: true})
  accountInfoComponent: AccountInfoComponent;
}

describe('AccountInfoComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: AccountInfoComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoComponent, TestComponent],
      imports: [
        RouterTestingModule
      ],
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
