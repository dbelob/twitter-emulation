import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HomeComponent } from './home.component';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login.component';
import { RegistrationComponent } from './registration.component';
import { ProfileComponent } from './profile.component';
import { DeleteAccountComponent } from './delete-account.component';
import { NewTweetComponent } from './new-tweet.component';
import { SearchComponent } from './search.component';
import { NotFoundComponent } from './not-found.component';

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
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account/show', component: AccountComponent},
  {path: 'account/register', component: RegistrationComponent},
  {path: 'account/profile', component: ProfileComponent},
  {path: 'account/delete', component: DeleteAccountComponent},
  {path: 'account/search', component: SearchComponent},
  {path: 'tweet', component: NewTweetComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
  providers: [AppService, {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule {
}
