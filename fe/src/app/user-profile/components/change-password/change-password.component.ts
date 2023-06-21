import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordComparisonValidator } from 'src/app/shared/util/validators.utils';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]), //TODO Add a password strength validator
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  shouldHideOldPassword = true;
  shouldHideNewPassword = true;
  shouldHideConfirmPassword = true;

  constructor() {
    this.form.addValidators(
      createPasswordComparisonValidator(
        this.form.get('newPassword'),
        this.form.get('confirmNewPassword'),
      )
    )
  }

  ngOnInit(): void {
  }

}
