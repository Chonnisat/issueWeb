import { MaterializeModule } from "angular2-materialize";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateZoneComponent } from './pages/private-zone/private-zone.component';
import { LoginComponent } from './pages/login/login.component';
import { IssueListComponent } from './pages/issue-list/issue-list.component';
import { IssueComponent } from './pages/issue/issue.component';
import { PublicZoneComponent } from './pages/public-zone/public-zone.component';
import { IssueAttachComponent } from './pages/issue-attach/issue-attach.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { LoginGuard } from './shared/user/login.guard';
import { UserService } from './shared/user/user.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PrivateZoneComponent,
    LoginComponent,
    IssueListComponent,
    IssueComponent,
    PublicZoneComponent,
    IssueAttachComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterializeModule,
    InfiniteScrollModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [LoginGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
