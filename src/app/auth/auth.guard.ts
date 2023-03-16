import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map((user) => {
        const isAuth = !!user; // returneaza true sau false
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      //   tap((isAuth) => {
      //     if (!isAuth) {
      //       this.router.navigate(['/auth']);   // poate duce la mai multe redirectionari care pot sa se amestece intre ele
      //     }
      //   })
    );
  }
}
