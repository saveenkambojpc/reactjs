import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimeField } from '@mui/x-date-pickers/TimeField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { serverAcceptedTime } from '../../../../services/date-format';
import dayjs from 'dayjs';

export default function TimeFieldComponent(
    {
        field,
        form,
        label,
    }: {
        field: any;
        form: any;
        label: any;
    }
) {
    const hour = field.value.split(":")[0]
    const minute = field.value.split(":")[1]
    const value = dayjs(dayjs().hour(hour).minute(minute).valueOf())

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
                value={value}
                label={label}
                onChange={(date) => {
                    form.setFieldValue(field.name, serverAcceptedTime(date));
                }}
                slotProps={{ textField: { size: "small", fullWidth: true } }}

            />
        </LocalizationProvider>
    );
}