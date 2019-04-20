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
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AccountService } from './services/account.service';
import { AuthenticationService } from './services/authentication.service';
import { TweetService } from './services/tweet.service';
import { ValidationService } from './services/validation.service';
import { HomeModule } from "./modules/home/home.module";
import { LoginModule } from "./modules/login/login.module";
import { MessageModule } from "./modules/message/message.module";
import { ProfileModule } from "./modules/profile/profile.module";
import { RegistrationModule } from "./modules/registration/registration.module";
import { TweetModule } from "./modules/tweet/tweet.module";
import { UnknownModule } from "./modules/unknown/unknown.module";
import { GeneralModule } from "./modules/general/general.module";
import { TweetsComponent } from "./modules/home/tweets.component";
import { FollowingComponent } from "./modules/home/following.component";
import { FollowersComponent } from "./modules/home/followers.component";
import { FollowerService } from "./services/follower.service";

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
  {path: 'account/tweets', component: TweetsComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/following', component: FollowingComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/followers', component: FollowersComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/delete', component: DeleteAccountComponent, canActivate: [AuthenticationGuard]},
  {path: 'account/search', component: SearchComponent, canActivate: [AuthenticationGuard]},
  {path: 'tweet', component: NewTweetComponent, canActivate: [AuthenticationGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'account/show'},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    GeneralModule,
    HomeModule,
    LoginModule,
    MessageModule,
    ProfileModule,
    RegistrationModule,
    TweetModule,
    UnknownModule
  ],
  providers: [AccountService, AuthenticationService, AuthenticationGuard, TweetService, ValidationService, FollowerService, {
    provide: HTTP_INTERCEPTORS,
    useClass: XhrInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
