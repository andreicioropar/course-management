import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "src/app/shared/model/course.model";
import { Curricula } from "src/app/shared/model/curricula.model";

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly COURSES_URL = '/api/v1/courses'
  private readonly CURRICULA_URL = '/api/v1/curricula'

  constructor(private http: HttpClient) {}

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.COURSES_URL);
  }

  public getCurriculaByCourseId(courseId: number): Observable<Curricula> {
    return this.http.get<Curricula>(`${this.CURRICULA_URL}/${courseId}`)
  }
}
