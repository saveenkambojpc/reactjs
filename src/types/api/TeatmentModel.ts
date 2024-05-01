export type TreatmentModel = {
  user_id: string;
  name: string;
  detail: string;
  link: string;
  id: string;
  partitionKey: "treatment";
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
};

export type TreatmentPostPutModel = {
  user_id: string;
  name: string;
  detail: string;
  link: string;
};
