import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  serverAcceptedDate,
} from "../../../../services/date-format";
import dayjs from "dayjs";

export default function DateFieldPicker({
  field,
  form,
  label,
  ...props
}: {
  field: any;
  form: any;
  label: any;
}) {
  const selectedDate = dayjs(field.value) || null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...field}
        {...props}
        format="DD-MM-YYYY"
        label={label}
        value={selectedDate}
        onChange={(date) => {
          form.setFieldValue(field.name, serverAcceptedDate(date));
        }}
        slotProps={{ textField: { size: "small", fullWidth: true } }}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
