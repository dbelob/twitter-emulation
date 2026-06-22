import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';
import { MessageComponent } from '../message/message.component';
import { TopBarComponent } from './top-bar.component';
import { AccountInfoComponent } from './account-info.component';
import { StatusInfoComponent } from './status-info.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MessageComponent, TopBarComponent, AccountInfoComponent, StatusInfoComponent]
})
export class HomeComponent implements OnInit {
  public userState: UserState = new UserState();

  constructor(@Inject(USER_STATE) private userStateObservable: Observable<UserState>) {
  }

  ngOnInit(): void {
    this.userStateObservable.subscribe((userState) => {
      this.userState = userState;
    });
  }
}
