import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { Login } from './auth.actions';
import { switchMap, tap } from 'rxjs';
import { UserInfo } from '../model/user.model';

export class AuthStateModel {
  accessToken?: string;
  user?: UserInfo;
}

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {},
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static getCurrentUserInfo(state: AuthStateModel): UserInfo | undefined {
    return state.user;
  }

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, login: Login) {
    return this.authService
      .login({
        userEmail: login.username,
        userPassword: login.password,
      })
      .pipe(
        switchMap(() => this.authService.getCurrentUser(login.username)),
        tap((response: UserInfo) => {
          patchState({
            user: response,
          });
        })
      );
  }

  // private static saveAccessToken(accessToken: string): void {
  //   localStorage.setItem('accessToken', accessToken);
  // }
}
