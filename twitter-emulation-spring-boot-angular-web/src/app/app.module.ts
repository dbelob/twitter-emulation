import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountComponent } from './modules/home/account.component';
import { DeleteAccountComponent } from './modules/profile/delete-account.component';
import { LoginComponent } from './modules/login/login.component';
import { NewTweetComponent } from './components/tweet/new-tweet.component';
import { NotFoundComponent } from './components/unknown/not-found.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SearchComponent } from './modules/home/search.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AccountService } from './services/account.service';
import { AuthenticationService } from './services/authentication.service';
import { TweetService } from './services/tweet.service';
import { ValidationService } from './services/validation.service';
import { HomeModule } from "./modules/home/home.module";
import { LoginModule } from "./modules/login/login.module";
import { MessageModule } from "./modules/message/message.module";
import { ProfileModule } from "./modules/profile/profile.module";

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
    RegistrationComponent,
    NewTweetComponent,
    NotFoundComponent,
    EqualValidatorDirective,
    AutofocusDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HomeModule,
    LoginModule,
    MessageModule,
    ProfileModule
  ],
  providers: [AccountService, AuthenticationService, AuthenticationGuard, TweetService, ValidationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
