import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseResponse } from 'src/app/shared/model/course.model';
import { CoursesService } from '../../services/courses.service';
import { Observable, mergeMap } from 'rxjs';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss'],
})
export class CourseViewComponent implements OnInit {
  course$!: Observable<CourseResponse>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      mergeMap((paramMap) => {
        const id = parseInt(paramMap.get('id') || '-1');
        return this.courseService.getCourseById(id);
      })
    );
  }
}
