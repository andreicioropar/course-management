export interface LessonRequest {
  name: string;
  content: string;
  userId: number;
}

export interface LessonResponse {
  id: number;
  name: string;
  content: Blob;
  userId: number;
}
