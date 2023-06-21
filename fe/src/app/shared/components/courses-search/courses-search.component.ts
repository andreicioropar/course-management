import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';
import { CourseResponse } from 'src/app/shared/model/course.model';
import { CoursesService } from '../../../courses/services/courses.service';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.scss'],
})
export class CoursesSearchComponent implements OnInit {
  searchCtrl: FormControl<string>;
  filteredResult: CourseResponse[] = [];
  selectedResult: CourseResponse | null = null;
  hasNoResults = false;
  minLengthTerm = 3;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService
  ) {
    this.searchCtrl = formBuilder.nonNullable.control('');
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => {
          this.filteredResult = [];
          this.hasNoResults = false;
        }),
        switchMap((searchTerm) => {
          return this.courseService.searchCourses(searchTerm);
        })
      )
      .subscribe({
        next: (courseResponse: CourseResponse[]) => {
          this.filteredResult = courseResponse;
          if (courseResponse.length === 0) {
            this.hasNoResults = true;
          }
        },
      });
  }

  clearSelection() {
    this.selectedResult = null;
    this.filteredResult = [];
  }
}
