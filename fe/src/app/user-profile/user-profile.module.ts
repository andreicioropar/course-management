import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserProfileComponent } from './components/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class UserMaterialModule {}

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    UserMaterialModule,
    ReactiveFormsModule,
  ],
})
export class UserProfileModule {}
