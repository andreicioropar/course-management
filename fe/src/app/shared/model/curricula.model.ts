export interface LessonDTOList {
  id: number;
  name: string;
  content: Blob;
  userId: number;
}

export interface Curricula {
  courseId: number;
  courseName: string;
  lessonDTOList: LessonDTOList[];
}
