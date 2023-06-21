import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserChangeEmail, UserChangePassword, UserInfo } from "src/app/shared/model/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private readonly USER_URL = 'api/v1/users';

  constructor(private http: HttpClient) {}

  public updateUser(userChangeEmail: UserChangeEmail) {
    return this.http.put(`${this.USER_URL}/change/email`, userChangeEmail);
  }

  public changePassword(userChangePassword: UserChangePassword) {
    return this.http.put(`${this.USER_URL}/change/password`, userChangePassword);
  }
}
