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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesSearchComponent } from './components/courses-search/courses-search.component';
import { MatCardModule } from '@angular/material/card';
import { LessonsSearchComponent } from './components/lessons-search/lessons-search.component';
import { LessonsAddComponent } from './components/lessons-add/lessons-add.component';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule
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
    LessonsSearchComponent,
    LessonsAddComponent,
  ],
  exports: [
    HeaderComponent,
    BasePageComponent,
    CoursesSearchComponent,
    LessonsSearchComponent,
    LessonsAddComponent,
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
