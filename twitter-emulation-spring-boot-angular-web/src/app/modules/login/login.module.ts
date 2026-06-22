import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { GeneralModule } from '../general/general.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GeneralModule,
        LoginComponent
    ]
})
export class LoginModule {
}
