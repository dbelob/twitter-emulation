import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountService } from './account.service';
import { AuthenticationService } from './authentication.service';
import { TweetService } from './tweet.service';
import { AccountComponent } from './home/account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteAccountComponent } from './profile/delete-account.component';
import { NewTweetComponent } from './tweet/new-tweet.component';
import { SearchComponent } from './home/search.component';
import { NotFoundComponent } from './unknown/not-found.component';
import { AuthenticationGuard } from "./authentication.guard";
import { TopBarComponent } from './home/top-bar.component';
import { AccountInfoComponent } from './home/account-info.component';
import { FollowComponent } from './home/follow.component';
import { EqualValidatorDirective } from './equal-validator.directive';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'account/register', component: RegistrationComponent},
  {path: 'account/show', component: AccountComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/delete', component: DeleteAccountComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/search', component: SearchComponent, canActivate: [AuthenticationGuard]},
  {path: 'tweet', component: NewTweetComponent, canActivate: [AuthenticationGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'account/show'},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    DeleteAccountComponent,
    NewTweetComponent,
    SearchComponent,
    NotFoundComponent,
    TopBarComponent,
    AccountInfoComponent,
    FollowComponent,
    EqualValidatorDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AccountService, AuthenticationService, AuthenticationGuard, TweetService, {
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
