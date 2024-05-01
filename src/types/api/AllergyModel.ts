export type AllergyModel = {
  name: string;
  user_id: string;
  icon: string;
  percent: number;
  symptoms: string[];
  treatment: string;
  diagnose: string;
  link: string;
  id: string;
  partitionKey: string;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
};

export type AllergyPostPut = {
  name: string;
  user_id: string;
  icon: string;
  percent: number;
  symptoms: string[];
  treatment: string;
  diagnose: string;
  link: string;
};
