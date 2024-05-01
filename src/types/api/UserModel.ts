export type UserModel = {
  dob: string;
  roles: string[];
  gender: string;
  designation: string;
  height: number;
  weight: number;
  name: string;
  email: string;
  phone_number: string;
  id: string;
  image_uri: string;
  account_approved: boolean;
  last_login_timestamp: string;
  last_login_attempt_timestamp: string;
  last_login_attempts_success: false;
  login_attempts: number;
  created_at: string;
  created_by: string;
  update_at: string;
  updated_by: string;
  partitionKey: string;
};

export type UserPostPut = {
  name: string;
  designation: string;

  email: string;
  phone_number: string;

  gender: string;
  dob: string;
  height: number;
  weight: number;

  roles: [];
};
