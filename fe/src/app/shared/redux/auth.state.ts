import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AuthService } from "../services/auth.service";
import { Login } from "./auth.actions";

export class AuthStateModel {
  accessToken?: string;
  user?: string;
}

@State<AuthStateModel>({
  name: 'Auth',
  defaults: {},
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, login: Login) {
    return this.authService
      .login({
        userEmail: login.username,
        userPassword: login.password,
      });
  }

  // private static saveAccessToken(accessToken: string): void {
  //   localStorage.setItem('accessToken', accessToken);
  // }
}
