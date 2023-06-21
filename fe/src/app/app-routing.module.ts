import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesCrudComponent } from './courses/components/courses-crud/courses-crud.component';
import { LessonsCrudComponent } from './lessons/components/lessons-crud/lessons-crud.component';
import { CourseViewComponent } from './courses/components/course-view/course-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addCourse', component: CoursesCrudComponent},
  {path: 'addLesson', component: LessonsCrudComponent},
  {
    path: 'profile',
    loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule),
  },
  {path: 'courses/:id', component: CourseViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
