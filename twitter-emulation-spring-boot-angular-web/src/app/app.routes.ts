import { Routes } from "@angular/router";
import { AccountComponent } from "./modules/home/account.component";
import { authenticationCanActivate } from "./shared/guards/authentication.guard";
import { DeleteAccountComponent } from "./modules/profile/delete-account.component";
import { FollowersComponent } from "./modules/home/followers.component";
import { FollowingComponent } from "./modules/home/following.component";
import { homeResolve } from "./modules/home/home.resolver";
import { LoginComponent } from "./modules/login/login.component";
import { NewTweetComponent } from "./modules/tweet/new-tweet.component";
import { NotFoundComponent } from "./modules/unknown/not-found.component";
import { ProfileComponent } from "./modules/profile/profile.component";
import { RegistrationComponent } from "./modules/registration/registration.component";
import { SearchComponent } from "./modules/home/search.component";
import { TweetsComponent } from "./modules/home/tweets.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "account/register", component: RegistrationComponent },
  {
    path: "account/show/:user",
    component: AccountComponent,
    resolve: { home: homeResolve },
  },
  {
    path: "account/show",
    component: AccountComponent,
    canActivate: [authenticationCanActivate],
  },
  {
    path: "account/tweets/:user",
    component: TweetsComponent,
    resolve: { home: homeResolve },
  },
  {
    path: "account/following/:user",
    component: FollowingComponent,
    resolve: { home: homeResolve },
  },
  {
    path: "account/followers/:user",
    component: FollowersComponent,
    resolve: { home: homeResolve },
  },
  {
    path: "account/profile",
    component: ProfileComponent,
    canActivate: [authenticationCanActivate],
  },
  {
    path: "account/delete",
    component: DeleteAccountComponent,
    canActivate: [authenticationCanActivate],
  },
  {
    path: "account/search",
    component: SearchComponent,
    canActivate: [authenticationCanActivate],
  },
  {
    path: "tweet",
    component: NewTweetComponent,
    canActivate: [authenticationCanActivate],
  },
  { path: "", pathMatch: "full", redirectTo: "account/show" },
  { path: "**", component: NotFoundComponent },
];
