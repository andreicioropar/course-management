import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import {
  CourseRequest,
  CourseResponse,
} from 'src/app/shared/model/course.model';
import { UserInfo } from 'src/app/shared/model/user.model';
import { AuthState } from 'src/app/shared/redux/auth.state';
import { createUrlValidator } from 'src/app/shared/util/validators.utils';
import { CoursesService } from '../../services/courses.service';
import { LessonResponse } from 'src/app/shared/model/lesson.model';
import { CurriculaRequest } from 'src/app/shared/model/curricula.model';

@Component({
  selector: 'app-courses-crud',
  templateUrl: './courses-crud.component.html',
  styleUrls: ['./courses-crud.component.scss'],
})
export class CoursesCrudComponent implements OnInit {
  courseForm!: FormGroup;
  lessons: LessonResponse[] = [];
  userId: number = 0;
  savedCourse?: CourseResponse;
  lessonIds: number[] = [];

  @Select(AuthState.getCurrentUserInfo)
  currentUser$!: Observable<UserInfo>;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.initCourseForm();
  }

  private initCourseForm(course?: CourseResponse) {
    this.courseForm = this.formBuilder.group({
      courseName: this.formBuilder.nonNullable.control(
        {
          value: course?.courseName || '',
          disabled: false,
        },
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ),
      imageUrl: this.formBuilder.control(
        {
          value: course?.imageUrl,
          disabled: false,
        },
        [Validators.required, createUrlValidator()]
      ),
    });
  }

  saveCourse() {
    const courseName = this.courseForm.get('courseName')?.value;
    const imageUrl = this.courseForm.get('imageUrl')?.value;
    const userId = this.getUserId();

    const course: CourseRequest = {
      name: courseName,
      userId: userId,
      imageUrl: imageUrl,
    };

    this.courseService
      .addCourse(course)
      .subscribe((res) => (this.savedCourse = res));
  }

  addLesson(lesson: LessonResponse) {
    this.lessons.push(lesson);
  }

  private getUserId(): number {
    this.currentUser$.subscribe((user) => (this.userId = user.id));

    return this.userId;
  }

  deleteLesson(index: number) {
    this.lessons.splice(index, 1);
  }

  addLessonsToCourse() {
    const courseId = this.savedCourse?.courseId;

    if (courseId !== undefined) {
      for (let lesson of this.lessons) {
        this.lessonIds.push(lesson.id);
      }

      const curriculaRequest: CurriculaRequest = {
        courseId: courseId,
        lessonIdList: this.lessonIds,
      };

      this.courseService.addLessonsToCourse(curriculaRequest).subscribe();
    } //Error handling
  }
}
