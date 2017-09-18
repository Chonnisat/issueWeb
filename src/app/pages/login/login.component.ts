import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogedIn = false;
  user : User;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('auth_token')) {
        this.isLogedIn = true;
      }
    }
  }

  data = {
    msg: ''
  };

  ngOnInit() {

  }

  doLogin() {
    $('#PNP_LOAD_MASK').show();
    this.userService.login(this.user)
      .subscribe(
      data => {
        if (data.success) {
          localStorage.setItem('auth_token', data.auth_token);
          $('#PNP_LOAD_MASK').hide();
          this.router.navigate(['admin','issue-list']);
        } else {
          $('#PNP_LOAD_MASK').hide();
          this.isLogedIn = false;
          this.data.msg = data.message;
          this.alertMsg();
        }
      },
      err => {
        console.log(err);
      }
      );
  }

  logout() {
    this.userService.logout();
    this.isLogedIn = false;
    this.resetForm();
    this.router.navigate(['']);
  }

  resetForm() {
    this.user = new User();
  }

  alertMsg() {
    Materialize.toast(`${this.data.msg}.`, 4000, '', function () { });
  }
}