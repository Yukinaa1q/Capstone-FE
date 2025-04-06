export interface IUserProfile {
  userCode: string; // Student Code, Tutor Code, Parent Code
  userId: string; // Postgres generated id
  fullName: string;
  email: string;
  dob?: Date;
  phoneNumber: string;
}

export interface ParentLink {
  parentImgUrl: string;
  parentName: string;
  parentEmail: string;
}

export interface TutorDetail {
  userCode: string;
  userId: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  dob: string;
  ssid: string;
  address: string;
  phoneNumber: string;
}
