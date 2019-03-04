import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { AccountComponent } from './home/account.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { DeleteAccountComponent } from './profile/delete-account.component';
import { NewTweetComponent } from './tweet/new-tweet.component';
import { SearchComponent } from './home/search.component';
import { NotFoundComponent } from './not-found.component';
import { AuthenticationGuardService } from "./authentication-guard.service";

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
  {path: 'account/show', component: AccountComponent, canActivate: [AuthenticationGuardService]},
  {path: 'account/profile', component: ProfileComponent, canActivate: [AuthenticationGuardService]},
  {path: 'account/delete', component: DeleteAccountComponent, canActivate: [AuthenticationGuardService]},
  {path: 'account/search', component: SearchComponent, canActivate: [AuthenticationGuardService]},
  {path: 'tweet', component: NewTweetComponent, canActivate: [AuthenticationGuardService]},
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
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthenticationService, AuthenticationGuardService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}
