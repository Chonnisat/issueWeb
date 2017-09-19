// user.service.ts
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private loggedIn = false;
  headers;
  options;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private http: Http) {
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('auth_token')) {
        this.loggedIn = true;
      }
      // console.log(this.loggedIn);
    }
    this.headers = new Headers();

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'JWT ' + localStorage.getItem('auth_token')
    }); // ... Set content type to JSON
    this.options = new RequestOptions({ headers: this.headers }); // Create a request option
  }

  login(body): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.post(`${environment.remoteAPI}/api/v1/login/doLogin` , bodyString , this.options)
      .map(res => res.json())
      .do(res => {
        if (res.success) {
          if (isPlatformBrowser(this._platformId)) {
            localStorage.setItem('auth_token', res.token);
            localStorage.setItem('userName', res.userName);
          }
          this.loggedIn = true;
        }

        return res.success;
      });
  }

  logout() {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userName');
    }
    this.loggedIn = false;
  }

  isLoggedIn() {
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('auth_token')) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }

    return this.loggedIn;
  }
}
