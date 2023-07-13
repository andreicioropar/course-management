export interface UserInfo {
  id: number;
  userName: string;
  userEmail: string;
  userRole: String;
  courseIds: number[];
}

export interface UserChangeEmail {
  userId: number;
  newUserEmail: string;
}

export interface UserChangePassword {
  userId: number;
  oldUserPassword: string;
  newUserPassword: string;
}

export interface UserEnrollRequest {
  userId: number;
  courseId: number;
}
