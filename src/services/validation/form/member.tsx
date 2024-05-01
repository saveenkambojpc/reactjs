import * as Yup from "yup";

export const MemberValidation = Yup.object({
    name: Yup.string().required('required'),
    username: Yup.string().max(20, 'Username must be at most 20 characters').required('required'),
    email: Yup.string().email().required('required'),
    phone_number: Yup.string().required('required'),
    gender: Yup.string().required('required'),
    height: Yup.string().required('required'),
    weight: Yup.string().required('required'),
    dob: Yup.string().required('required'),
})
