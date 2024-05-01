import * as Yup from "yup";

export const UserValidation = Yup.object({
    name: Yup.string().required('required'),
    designation: Yup.string().required('required'),

    email: Yup.string().email().required('required'),
    phone_number: Yup.string().required('required'),

    gender: Yup.string().required('required'),
    dob: Yup.string().required('required'),

    height: Yup.number().required('required'),
    weight: Yup.number().required('required'),

    roles: Yup.array(),
})