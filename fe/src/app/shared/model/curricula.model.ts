import { LessonDTOList } from "./course.model";

export interface CurriculaRequest {
  courseId: number;
  lessonIdList: number[];
}

export interface CurriculaResponse {
  courseId: number;
  courseName: string;
  imageUrl: string;
  lessonDTOList: LessonDTOList[];
}
