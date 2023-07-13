import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { GetCurrentUserInfo, Login, Logout } from './auth.actions';
import { EMPTY, filter, switchMap, tap } from 'rxjs';
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
  static getUserEmail(state: AuthStateModel): string | undefined {
    const savedUserEmail = AuthState.loadUserEmail();
    return state.user?.userEmail || savedUserEmail;
  }

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
        tap((response) => {
          // patchState({
          //   userEmail: response.userEmail,
          // });
          AuthState.saveUserEmail(response.userEmail);
        }),
        switchMap(() => this.authService.getCurrentUser(login.username)),
        tap((response: UserInfo) => {
          patchState({
            user: response,
          });
        })
      );
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      accessToken: undefined,
      user: undefined,
    });
    AuthState.clearUserEmail();
  }

  @Action(GetCurrentUserInfo)
  getCurrentUserInfo({ getState, patchState }: StateContext<AuthStateModel>) {
    const userEmail = AuthState.getUserEmail(getState());

    if (userEmail) {
      return this.authService.getCurrentUser(userEmail).pipe(
        filter(
          (response) =>
            JSON.stringify(getState().user) !== JSON.stringify(response)
        ),
        tap((response) => {
          return patchState({
            user: response,
          });
        })
      );
    } else {
      return EMPTY;
    }
  }

  // private static saveAccessToken(accessToken: string): void {
  //   localStorage.setItem('accessToken', accessToken);
  // }

  private static saveUserEmail(userEmail: string): void {
    localStorage.setItem('userEmail', userEmail);
  }

  private static loadUserEmail(): string | undefined {
    return localStorage.getItem('userEmail') || undefined;
  }

  private static clearUserEmail(): void {
    localStorage.removeItem('userEmail');
  }
}
