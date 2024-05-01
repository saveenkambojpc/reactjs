import React from 'react';
import {  FieldAttributes, Field } from 'formik';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
interface FieldType {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface Option {
    value: string;
    label: string;
}

interface CustomSelectFieldProps extends FieldAttributes<any> {
    label?: string;
    options: Option[];
    name: string
}

const SelectField: React.FC<CustomSelectFieldProps> = ({ label, options, name }) => {
    // const [field, meta, helpers] = useField(props);

    const handleChange = (event: any, form: any) => {
        // helpers.setValue(event.target.value);
        const { value } = event.target
        const { setFieldValue } = form
        setFieldValue(name, value)
        // setFieldValue(name, value)
    };

    return (
        <Field name={name}>
            {({
                field,
                form,
            }: {
                field: FieldType;
                form: any;
            }) => (
                <FormControl fullWidth size='small'>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        error={form.errors[field.name] && form.touched[field.name] ? true : false}
                        label={label}
                        size='small'
                        onChange={(e) => handleChange(e, form)}
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {form.errors[field.name] && form.touched[field.name] &&
                        <FormHelperText error>
                            {form.errors[field.name]}
                        </FormHelperText>
                    }
                </FormControl>
            )}
        </Field>
    );
};

export default SelectField;