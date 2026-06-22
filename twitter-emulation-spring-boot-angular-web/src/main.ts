import { enableProdMode, provideZoneChangeDetection, Injectable, importProvidersFrom } from '@angular/core';
import { platformBrowser, BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { XhrInterceptor } from './app/app.module';
import { environment } from './environments/environment';
import { AccountService } from './app/shared/services/account.service';
import { AuthenticationService } from './app/shared/services/authentication.service';
import { TweetService } from './app/shared/services/tweet.service';
import { ValidationService } from './app/shared/services/validation.service';
import { FollowerService } from './app/shared/services/follower.service';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, provideHttpClient, withXhr } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/modules/login/login.component';
import { RegistrationComponent } from './app/modules/registration/registration.component';
import { AccountComponent } from './app/modules/home/account.component';
import { homeResolve } from './app/modules/home/home.resolver';
import { authenticationCanActivate } from './app/shared/guards/authentication.guard';
import { TweetsComponent } from './app/modules/home/tweets.component';
import { FollowingComponent } from './app/modules/home/following.component';
import { FollowersComponent } from './app/modules/home/followers.component';
import { ProfileComponent } from './app/modules/profile/profile.component';
import { DeleteAccountComponent } from './app/modules/profile/delete-account.component';
import { SearchComponent } from './app/modules/home/search.component';
import { NewTweetComponent } from './app/modules/tweet/new-tweet.component';
import { NotFoundComponent } from './app/modules/unknown/not-found.component';
import { HomeModule } from './app/modules/home/home.module';
import { MessageModule } from './app/modules/message/message.module';
import { ProfileModule } from './app/modules/profile/profile.module';
import { RegistrationModule } from './app/modules/registration/registration.module';
import { TweetModule } from './app/modules/tweet/tweet.module';
import { AppComponent } from './app/app.component';

const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account/register', component: RegistrationComponent },
  { path: 'account/show/:user', component: AccountComponent, resolve: { home: homeResolve } },
  { path: 'account/show', component: AccountComponent, canActivate: [authenticationCanActivate] },
  { path: 'account/tweets/:user', component: TweetsComponent, resolve: { home: homeResolve } },
  { path: 'account/following/:user', component: FollowingComponent, resolve: { home: homeResolve } },
  { path: 'account/followers/:user', component: FollowersComponent, resolve: { home: homeResolve } },
  { path: 'account/profile', component: ProfileComponent, canActivate: [authenticationCanActivate] },
  { path: 'account/delete', component: DeleteAccountComponent, canActivate: [authenticationCanActivate] },
  { path: 'account/search', component: SearchComponent, canActivate: [authenticationCanActivate] },
  { path: 'tweet', component: NewTweetComponent, canActivate: [authenticationCanActivate] },
  { path: '', pathMatch: 'full', redirectTo: 'account/show' },
  { path: '**', component: NotFoundComponent }
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, HomeModule, MessageModule, ProfileModule, RegistrationModule, TweetModule),
        AccountService, AuthenticationService, TweetService, ValidationService, FollowerService, {
            provide: HTTP_INTERCEPTORS,
            useClass: XhrInterceptor,
            multi: true
        },
        provideHttpClient(withXhr()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
