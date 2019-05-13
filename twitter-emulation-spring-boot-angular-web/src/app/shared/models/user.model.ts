import { InjectionToken } from "@angular/core";

export class User {
  constructor(
    public name?: string,
  ) {
  }
}

export const DATA_USERNAME = new InjectionToken("data_userName");
