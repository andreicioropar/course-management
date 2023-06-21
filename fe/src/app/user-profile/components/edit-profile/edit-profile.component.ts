import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, filter } from 'rxjs';
import { UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.currentUser$
      .pipe(filter(user => user !== undefined))
      .subscribe(user => {
        this.initForm(user);
      });
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

  onSubmitForm() {
    // this.
  }
}
