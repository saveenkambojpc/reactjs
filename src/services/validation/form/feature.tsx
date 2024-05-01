import * as Yup from "yup";

export const FeatureValidation = Yup.object({
    name: Yup.string().required('required'),
    description: Yup.string().required('required'),
})