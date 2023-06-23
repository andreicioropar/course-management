import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CourseResponse,
  LessonDTOList,
} from 'src/app/shared/model/course.model';
import { CoursesService } from '../../services/courses.service';
import { Observable, map, mergeMap } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { UserEnrollRequest, UserInfo } from 'src/app/shared/model/user.model';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent implements OnInit {
  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  course$!: Observable<CourseResponse>;
  toTearnList: string[] = [
    'Introduction in Java.',
    "After this course you'll be able to buld an app.",
    'Work as a freelance web developer.',
    'Lorem ipsul tesasdgnasdgasgasdgd.',
    'asdasfasgasg',
    'asdasgasgasg',
  ];

  displayedColumns: string[] = ['lessonName', 'downloadCourse'];

  dataSource: LessonDTOList[] = [];
  courseUserId: number = 0;
  userId: number = 0;
  courseId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      mergeMap((paramMap) => {
        const id = parseInt(paramMap.get('id') || '-1');
        return this.courseService.getCourseById(id);
      })
    );

    this.course$.subscribe((res) => {
      this.dataSource = res.lessonDTOList;
      this.courseUserId = res.userId;
      this.courseId = res.courseId;
    });
  }

  userCanEdit() {
    return this.currentUser$.pipe(
      map((user) => {
        if (user) {
          return (
            (user.userRole.includes('Admin') ||
              user.userRole.includes('Teacher')) &&
            this.courseUserId === user.id
          );
        } else {
          return false;
        }
      })
    );
  }

  private getUserId(): number {
    this.currentUser$.subscribe((user) => (this.userId = user.id));

    return this.userId;
  }

  enrollToCourse() {
    const userId = this.getUserId();

    const userEnrollRequest: UserEnrollRequest = {
      userId: userId,
      courseId: this.courseId,
    };

    this.userService.enroll(userEnrollRequest).subscribe();
  }
}
