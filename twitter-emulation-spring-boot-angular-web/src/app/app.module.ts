import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountComponent } from './modules/home/account.component';
import { DeleteAccountComponent } from './modules/profile/delete-account.component';
import { LoginComponent } from './modules/login/login.component';
import { NewTweetComponent } from './modules/tweet/new-tweet.component';
import { NotFoundComponent } from './modules/unknown/not-found.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { SearchComponent } from './modules/home/search.component';
import { authenticationCanActivate } from './shared/guards/authentication.guard';
import { AccountService } from './shared/services/account.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { TweetService } from './shared/services/tweet.service';
import { ValidationService } from './shared/services/validation.service';
import { FollowerService } from './shared/services/follower.service';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { MessageModule } from './modules/message/message.module';
import { ProfileModule } from './modules/profile/profile.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { TweetModule } from './modules/tweet/tweet.module';
import { UnknownModule } from './modules/unknown/unknown.module';
import { TweetsComponent } from './modules/home/tweets.component';
import { FollowingComponent } from './modules/home/following.component';
import { FollowersComponent } from './modules/home/followers.component';
import { homeResolve } from './modules/home/home.resolver';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  {path: 'account/show/:user', component: AccountComponent, resolve: {home: homeResolve}},
  {path: 'account/show', component: AccountComponent, canActivate: [authenticationCanActivate]},
  {path: 'account/tweets/:user', component: TweetsComponent, resolve: {home: homeResolve}},
  {path: 'account/following/:user', component: FollowingComponent, resolve: {home: homeResolve}},
  {path: 'account/followers/:user', component: FollowersComponent, resolve: {home: homeResolve}},
  {path: 'account/profile', component: ProfileComponent, canActivate: [authenticationCanActivate]},
  {path: 'account/delete', component: DeleteAccountComponent, canActivate: [authenticationCanActivate]},
  {path: 'account/search', component: SearchComponent, canActivate: [authenticationCanActivate]},
  {path: 'tweet', component: NewTweetComponent, canActivate: [authenticationCanActivate]},
  {path: '', pathMatch: 'full', redirectTo: 'account/show'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {}),
    BrowserModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    MessageModule,
    ProfileModule,
    RegistrationModule,
    TweetModule,
    UnknownModule
  ],
  providers: [AccountService, AuthenticationService, TweetService, ValidationService, FollowerService, {
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
