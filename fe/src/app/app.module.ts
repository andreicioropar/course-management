import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { appStates } from './shared/redux/app.state';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule, SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CoursesListComponent } from './courses/components/courses-list/courses-list.component';
import { CoursesCrudComponent } from './courses/components/courses-crud/courses-crud.component';
import { LessonsCrudComponent } from './lessons/components/lessons-crud/lessons-crud.component';
import { MyCoursesComponent } from './courses/components/my-courses/my-courses.component';
import { CourseViewComponent } from './courses/components/course-view/course-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CoursesListComponent,
    CoursesCrudComponent,
    LessonsCrudComponent,
    MyCoursesComponent,
    CourseViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    NgxsModule.forRoot(appStates, {
      developmentMode: !environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    SlickCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
