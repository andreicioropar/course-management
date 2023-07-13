import { Component, OnInit } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/shared/model/user.model';
import { GetCurrentUserInfo, Logout } from 'src/app/shared/redux/auth.actions';
import { AuthState } from 'src/app/shared/redux/auth.state';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
})
export class HeaderUserComponent implements OnInit {
  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentUserInfo());
  }

  logout() {
    this.store
      .dispatch(new Logout())
      .subscribe(() => this.store.dispatch(new Navigate(['/login'])));
  }
}
