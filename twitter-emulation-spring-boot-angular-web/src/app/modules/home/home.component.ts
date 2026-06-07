import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_STATE, UserState } from '../../shared/models/user-state.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
