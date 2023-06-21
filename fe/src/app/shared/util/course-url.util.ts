import { CourseResponse } from '../model/course.model';

export const createCourseViewRouteUrl = (course: CourseResponse): string => {
  return '/courses/' + `${createCourseUrlPath(course)}`;
};

const createCourseUrlPath = (course: CourseResponse): string => {
  const pathId = course.courseId;

  return `${pathId}`;
};
