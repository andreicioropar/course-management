import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, filter } from 'rxjs';
import { UserChangeEmail, UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { UserProfileService } from '../../services/user-profile.service';
import { GetCurrentUserInfo, Logout } from 'src/app/shared/redux/auth.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  userId: number = 0;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.currentUser$
      .pipe(filter((user) => user !== undefined))
      .subscribe((user) => {
        this.initForm(user);
      });
    this.store.dispatch(new GetCurrentUserInfo());
  }

  private initForm(user: UserInfo) {
    this.form = this.formBuilder.group({
      username: this.formBuilder.nonNullable.control({
        value: user.userName,
        disabled: true,
      }),
      email: this.formBuilder.nonNullable.control(user.userEmail, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  private getUserId(): number {
    this.currentUser$.subscribe((user) => (this.userId = user.id));

    return this.userId;
  }

  onSubmitForm() {
    const userId = this.getUserId();
    const email = this.form.get('email')?.value;

    const userChangeEmail: UserChangeEmail = {
      userId: userId,
      newUserEmail: email,
    };

    this.userProfileService.updateUser(userChangeEmail).subscribe({
      next: () => {
        this.store.dispatch(new Logout());
        this.store.dispatch(new Navigate(['/login']));
      },
    });
  }
}
