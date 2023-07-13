import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, filter, forkJoin, map, mergeMap, tap } from 'rxjs';
import { CourseResponse } from 'src/app/shared/model/course.model';
import { UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { CoursesService } from '../../services/courses.service';
import { createCourseViewRouteUrl } from 'src/app/shared/util/course-url.util';
import { GetCurrentUserInfo } from 'src/app/shared/redux/auth.actions';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit {
  createViewRouteUrl = createCourseViewRouteUrl;

  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  courses$!: Observable<CourseResponse[]>;

  constructor(private courseService: CoursesService, private store: Store) {}

  ngOnInit(): void {
    this.courses$ = this.currentUser$.pipe(
      filter((userInfo: UserInfo) => userInfo !== undefined),
      mergeMap((userInfo: UserInfo) => {
        const courses$ = userInfo.courseIds.map((courseId: number) => {
          return this.courseService.getCourseById(courseId);
        });

        return forkJoin(courses$);
      })
    );
  }
}
