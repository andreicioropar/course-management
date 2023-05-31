import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../model/auth.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_URL = '/api/v1/users/login';

  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest) {
    return this.http.post(this.LOGIN_URL, loginRequest);
  }
}
