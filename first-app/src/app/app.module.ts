import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AddComponent} from './add/add.component';
import {FormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import { PersonalCenterComponent } from './personal-center/personal-center.component';
import { SexPipe } from './personal-center/sex.pipe';
import {XAuthTokenInterceptor} from './x-auth-token.interceptor';
import {WelcomeComponent} from './welcome.component';
import { NavComponent } from './nav/nav.component';
import {ApiInterceptor} from './api.interceptor';
import {UnAuthInterceptor} from './un-auth.interceptor';
import {PageModule} from './clazz/page/page.module';


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    LoginComponent,
    IndexComponent,
    PersonalCenterComponent,
    SexPipe,
    WelcomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    PageModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: XAuthTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnAuthInterceptor, multi: true}
  ],
  bootstrap: [IndexComponent]
})
export class AppModule {
}
