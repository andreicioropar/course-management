import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../model/auth.model";
import { UserInfo } from "../model/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_URL = '/api/v1/users/login';
  private readonly GET_CURRENT_USER_URL = '/api/v1/users/info';

  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest) {
    return this.http.post(this.LOGIN_URL, loginRequest);
  }

  public getCurrentUser(username: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.GET_CURRENT_USER_URL}/${username}`);
  }

}
