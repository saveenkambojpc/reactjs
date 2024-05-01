import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

interface Value {
  title: string;
  id: string;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface MultiSelectInputProps {
  selectedOptions: Value[];
  onChange: (arg1: Value[]) => void;
  options: Value[];
  label: string;
}
export default function MultiSelectInput({
  selectedOptions,
  options,
  onChange,
  label,
}: MultiSelectInputProps) {
  const handleSelectionChange = (
    _event: React.ChangeEvent<unknown>,
    newValues: Value[]
  ) => {
    onChange(newValues);
  };

  const customIsOptionEqualToValue = (option: Value, value: Value) =>
    option.id === value.id;

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      fullWidth
      disableCloseOnSelect
      size="small"
      isOptionEqualToValue={customIsOptionEqualToValue}
      getOptionLabel={(option) => option.title}
      value={selectedOptions} // Set the initial selected options
      onChange={handleSelectionChange}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={label} />
      )}
    />
  );
}

// const options: Value[] = [
//   { title: 'Apple', id: 1 },
//   { title: 'Banana', id: 2 },
//   { title: 'Orange', id: 3 },
//   { title: 'Mango', id: 4 },
// ];

{
  /* <MultiSelectInput
selectedOptions={[{ title: 'Apple', id: 1 }]}
options={[
  { title: 'Apple', id: 1 },
  { title: 'Banana', id: 2 },
  { title: 'Orange', id: 3 },
  { title: 'Mango', id: 4 },
]}
/> */
}
