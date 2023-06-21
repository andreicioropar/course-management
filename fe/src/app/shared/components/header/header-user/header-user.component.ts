import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  constructor() {}

  ngOnInit(): void {}

  logout() {}
}
