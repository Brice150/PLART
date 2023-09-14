import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.url[0].path === 'admin') {
      return (
        sessionStorage.getItem('role') !== null &&
        JSON.parse(sessionStorage.getItem('role')!) === 'ROLE_ADMIN'
      );
    }
    return sessionStorage.getItem('role') !== null;
  }
}
