export type DocumentPost = {
  document: File;
  type: string;
  username: string;
  feature: string;
  document_name: string;
};

export type DocumentModel = {
  type: string;
  feature: string;
  document_name: string;
  document_path: string;
  partitionKey: "document";
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  id: string;
  username: string;
};

export type DocumentPutModel = {
  type: string;
  feature: string;
  document_name: string;
};
