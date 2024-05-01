import * as Yup from "yup";

export const MedicationValidation = Yup.object({
    name: Yup.string().required('required'),
    frequency: Yup.string().required('required'),

    dose_time_freq: Yup.number().required('required'),


    meal_timing: Yup.string().required('required'),
    remarks: Yup.string().required('required'),
    
    start_date: Yup.string().required('required'),
    end_date: Yup.string().required('required'),

})