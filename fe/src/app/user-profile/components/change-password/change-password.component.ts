import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserChangePassword, UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { createPasswordComparisonValidator } from 'src/app/shared/util/validators.utils';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  userId: number = 0;

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]), //TODO Add a password strength validator
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  shouldHideOldPassword = true;
  shouldHideNewPassword = true;
  shouldHideConfirmPassword = true;

  constructor(private userProfileService: UserProfileService) {
    this.form.addValidators(
      createPasswordComparisonValidator(
        this.form.get('newPassword'),
        this.form.get('confirmNewPassword')
      )
    );
  }

  ngOnInit(): void {}

  private getUserId(): number {
    this.currentUser$.subscribe((user) => (this.userId = user.id));

    return this.userId;
  }

  onSubmitForm() {
    const userId = this.getUserId();
    const oldPassword = this.form.get('oldPassword')?.value;
    const newPassword = this.form.get('newPassword')?.value;

    const changePassword: UserChangePassword = {
      userId: userId,
      oldUserPassword: oldPassword,
      newUserPassword: newPassword,
    };

    this.userProfileService.changePassword(changePassword).subscribe();
  }
}
