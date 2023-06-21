export interface CourseRequest {
  name: string;
  userId: number;
  imageUrl: string;
}

export interface CourseResponse {
  courseId: number;
  courseName: string;
  userId: number;
  imageUrl: string;
  lessonDTOList: LessonDTOList[];
}

export interface LessonDTOList {
  id: number;
  name: string;
  content: Blob;
  userId: number;
}
