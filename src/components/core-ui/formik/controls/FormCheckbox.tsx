import { FormControlLabel, Checkbox } from "@mui/material";
import { Field } from "formik";

interface FieldType {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function FormCheckbox({
  label,
  name,
  required,
  disabled,
  ...rest
}: {
  label?: string;
  name?: string;
  required?: boolean;
  rest?: [];
  disabled?: boolean;
}) {
  return (
    <Field name={name}>
      {({ field }: { field: FieldType; form: any }) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                {...rest}
                checked={Boolean(field.value)}
                onChange={field.onChange}
                name={name}
                disabled={disabled}
              />
            }
            label={label}
          />
        );
      }}
    </Field>
  );
}
