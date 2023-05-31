import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderUserComponent } from './components/header/header-user/header-user.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header/header-nav/header-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoursesSearchComponent } from '../courses/courses-search/courses-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
  ],
})
export class SharedMaterialModule {}

@NgModule({
  declarations: [
    HeaderComponent,
    BasePageComponent,
    HeaderUserComponent,
    HeaderNavComponent,
    CoursesSearchComponent,
  ],
  exports: [
    HeaderComponent,
    BasePageComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
