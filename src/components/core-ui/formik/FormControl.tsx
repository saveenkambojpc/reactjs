import { Field } from "formik";
import { Input, FormCheckbox } from "./controls";
import DateFieldPicker from "./inputs/DateFieldPicker";
import FileUpload from "./inputs/FileUpload";
import TimeFieldComponent from "./inputs/TimeFieldComponent";
import SelectField from "./inputs/SelectField";

export type Control = "input" | "checkbox" | "date" | "file" | "datetime" | "time" | "select";
export type FieldType = "text" | "number" | "password";

export default function FormControl({
  control,
  label,
  name,
  type,
  disabled,
  options = [],
  onChange,
  ...rest
}: {
  control: Control;
  label?: string;
  name: string;
  type?: FieldType;
  disabled?: boolean;
  options?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  switch (control) {
    case "input":
      return (
        <Input
          label={label}
          type={type}
          name={name}
          disabled={disabled}
          {...rest}
        />
      );
    case "checkbox":
      return (
        <FormCheckbox label={label} name={name} {...rest} disabled={disabled} />
      );
    case "datetime":
      return (
        <Field name={name} label="Select Date" component={DateFieldPicker} />
      );
    case "date":
      return (
        <Field name={name} label="Select Date" component={DateFieldPicker} />
      );
    case "time":
      return (
        <Field name={name} label={label} component={TimeFieldComponent} />
      );
    case "file":
      return (
        <FileUpload name={name} />
      );
    case "select":
      return (
        <SelectField
          options={options}
          onChange={onChange}
          label={label}
          name={name}
          disabled={disabled}
          {...rest} />
      )
    default:
      return null;
  }
}
