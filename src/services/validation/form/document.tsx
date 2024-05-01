import * as Yup from "yup";

export const DocumentUploadValidation = Yup.object({
  document: Yup.mixed().required("File is required"),
  type: Yup.string().required('required'),
  username: Yup.string().required('required'),
  feature: Yup.string().required('required'),
  document_name: Yup.string().required('required'),
});
export const DocumentUpdateValidation = Yup.object({
  type: Yup.string().required('required'),
  feature: Yup.string().required('required'),
  document_name: Yup.string().required('required'),
});
