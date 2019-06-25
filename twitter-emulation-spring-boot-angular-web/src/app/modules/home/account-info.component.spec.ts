import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoComponent } from './account-info.component';
import { RouterModule } from "@angular/router";
import { USER_STATE, UserState } from "../../shared/models/user-state.model";
import { Subject } from "rxjs";

describe('AccountInfoComponent', () => {
  let component: AccountInfoComponent;
  let fixture: ComponentFixture<AccountInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoComponent],
      imports: [
        RouterModule
      ],
      providers: [{provide: USER_STATE, useValue: new Subject<UserState>()}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
