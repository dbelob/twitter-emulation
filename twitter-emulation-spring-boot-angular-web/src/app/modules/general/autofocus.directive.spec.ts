import { AutofocusDirective } from './autofocus.directive';
import { Component, ViewChild } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <div><input type="text" class="form-control" id="username" name="username" appAutofocus/></div>
    <div><input type="password" class="form-control" id="password" name="password"/></div>`
})
class TestComponent {
  @ViewChild(AutofocusDirective, {static: true})
  autofocusDirective: AutofocusDirective;
}

describe('AutofocusDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: AutofocusDirective;
  let usernameInputElement: HTMLInputElement;
  let passwordInputElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, AutofocusDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    directive = fixture.componentInstance.autofocusDirective;
    usernameInputElement = fixture.debugElement.query(By.css("input[id=username]")).nativeElement;
    passwordInputElement = fixture.debugElement.query(By.css("input[id=password]")).nativeElement;
  });

  it('checks focus', () => {
    //TODO: implement
  });
});
