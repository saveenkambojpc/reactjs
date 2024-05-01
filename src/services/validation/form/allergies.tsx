import * as Yup from "yup";

export const AllergiesValiation = Yup.object({
    name: Yup.string().required(),
    icon: Yup.string().required(),
    percent: Yup.number().required(),
    treatment: Yup.string().required(),
    diagnose: Yup.string().required(),
    link: Yup.string().url().required(),
  });