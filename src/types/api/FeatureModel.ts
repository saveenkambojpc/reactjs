export type FeatureModel = {
  name: string;
  description: string;
  active: boolean;
  id: string;
  created_at: string;
  created_by: string;
  update_at: string;
  updated_by: string;
  partitionKey: "features";
};

export type FeaturePostPutModel = {
  name: string;
  description: string;
  active: boolean;
};

// in put accept id as query param
