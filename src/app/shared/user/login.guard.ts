import { Injectable, Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { UserService } from './user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    return this.userService.isLoggedIn();
  }
}
