import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CourseRequest,
  CourseResponse,
} from 'src/app/shared/model/course.model';
import {
  CurriculaRequest,
  CurriculaResponse,
} from 'src/app/shared/model/curricula.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly COURSES_URL = '/api/v1/courses';

  constructor(private http: HttpClient) {}

  public getAllCourses(): Observable<CourseResponse[]> {
    return this.http.get<CourseResponse[]>(this.COURSES_URL);
  }

  public getCourseById(id: number): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.COURSES_URL}/${id}`);
  }

  public searchCourses(searchTerm: string): Observable<CourseResponse[]> {
    const params = searchTerm
      ? new HttpParams({ fromObject: { searchTerm } })
      : new HttpParams();

    return this.http.get<CourseResponse[]>(this.COURSES_URL, {
      params,
    });
  }

  public addCourse(courseRequest: CourseRequest): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(this.COURSES_URL, courseRequest);
  }

  public addLessonsToCourse(
    curriculaRequest: CurriculaRequest
  ): Observable<CurriculaResponse> {
    return this.http.put<CurriculaResponse>(this.COURSES_URL, curriculaRequest);
  }
}
