export interface UserInfo {
  id: number;
  userName: string;
  userEmail: string;
  userRole: String;
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
