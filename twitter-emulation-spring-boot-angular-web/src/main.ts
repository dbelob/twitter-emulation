import {
  enableProdMode,
  provideZoneChangeDetection,
  Injectable,
  importProvidersFrom,
} from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  HTTP_INTERCEPTORS,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  provideHttpClient,
  withXhr,
} from "@angular/common/http";
import { provideRouter } from "@angular/router";

import { environment } from "./environments/environment";
import { AccountService } from "./app/shared/services/account.service";
import { AppComponent } from "./app/app.component";
import { AuthenticationService } from "./app/shared/services/authentication.service";
import { FollowerService } from "./app/shared/services/follower.service";
import { HomeModule } from "./app/modules/home/home.module";
import { MessageModule } from "./app/modules/message/message.module";
import { ProfileModule } from "./app/modules/profile/profile.module";
import { RegistrationModule } from "./app/modules/registration/registration.module";
import { TweetModule } from "./app/modules/tweet/tweet.module";
import { TweetService } from "./app/shared/services/tweet.service";
import { ValidationService } from "./app/shared/services/validation.service";
import { routes } from "./app/app.routes";

if (environment.production) {
  enableProdMode();
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set("X-Requested-With", "XMLHttpRequest"),
    });
    return next.handle(xhr);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HomeModule,
      MessageModule,
      ProfileModule,
      RegistrationModule,
      TweetModule,
    ),
    AccountService,
    AuthenticationService,
    TweetService,
    ValidationService,
    FollowerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideHttpClient(withXhr()),
    provideZoneChangeDetection(),
  ],
}).catch((err) => console.error(err));
