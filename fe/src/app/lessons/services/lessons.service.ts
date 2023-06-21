import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LessonRequest,
  LessonResponse,
} from 'src/app/shared/model/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  private readonly LESSONS_URL = '/api/v1/lessons';

  constructor(private http: HttpClient) {}

  public searchLessons(searchTerm: string): Observable<LessonResponse[]> {
    const params = searchTerm
      ? new HttpParams({ fromObject: { searchTerm } })
      : new HttpParams();

    return this.http.get<LessonResponse[]>(this.LESSONS_URL, {
      params,
    });
  }

  public addLesson(lessonRequest: LessonRequest): Observable<LessonResponse> {
    return this.http.post<LessonResponse>(this.LESSONS_URL, lessonRequest);
  }
}
