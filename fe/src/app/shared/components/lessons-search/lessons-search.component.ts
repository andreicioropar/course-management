import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LessonResponse } from '../../model/lesson.model';
import { LessonsService } from 'src/app/lessons/services/lessons.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-lessons-search',
  templateUrl: './lessons-search.component.html',
  styleUrls: ['./lessons-search.component.scss'],
})
export class LessonsSearchComponent implements OnInit {
  @Output() lesson = new EventEmitter<LessonResponse>();

  searchCtrl: FormControl<string>;
  filteredResult: LessonResponse[] = [];
  selectedResult: LessonResponse | null = null;
  hasNoResults = false;
  minLengthTerm = 3;

  constructor(
    private formBuilder: FormBuilder,
    private lessonService: LessonsService
  ) {
    this.searchCtrl = formBuilder.nonNullable.control('');
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => {
          this.filteredResult = [];
          this.hasNoResults = false;
        }),
        switchMap((searchTerm) => {
          return this.lessonService.searchLessons(searchTerm);
        })
      )
      .subscribe({
        next: (lessonResponse: LessonResponse[]) => {
          this.filteredResult = lessonResponse;
          if (lessonResponse.length === 0) {
            this.hasNoResults = true;
          }
        },
      });
  }

  clearSelection() {
    this.selectedResult = null;
    this.filteredResult = [];
  }

  onSelected() {
    if (this.selectedResult) {
      this.lesson.emit(this.selectedResult);
      this.clearSelection();
    }
  }
}
