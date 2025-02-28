export interface IUserProfile {
  userCode: string; // Student Code, Tutor Code, Parent Code
  userId: string; // Postgres generated id
  fullName: string;
  email: string;
  dob?: string;
  phoneNumber: string;
}

export interface ParentLink {
  parentImgUrl: string;
  parentName: string;
  parentEmail: string;
}