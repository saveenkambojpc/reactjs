import { useState } from "react";
import { Grid, ToggleButtonGroup, ToggleButton, IconButton, Button } from "@mui/material";
import FormControl, { Control } from "../../../../../components/core-ui/formik/FormControl";
import { DeleteIcon } from "../../../../../components/icons/icons";
import { FieldArray } from "formik";
import { weeklyDoseTimeOptions } from "../../../../../constants/options";
import { serverAcceptedTime } from "../../../../../services/date-format";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";


type DoseFieldArrayProps = {
    values: any;
};

function DoseFieldArray({ values }: DoseFieldArrayProps) {
    const [doseTimeInputType, setDoseTimeInputType] = useState('input')

    const handleToggle = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setDoseTimeInputType(newAlignment)
    }

    return (
        <Grid container >
            {values.frequency === 'daily' &&
                <Grid xs={12} mb={3}>
                    <ToggleButtonGroup
                        fullWidth
                        color="primary"
                        size="small"
                        value={doseTimeInputType}
                        exclusive
                        onChange={handleToggle}
                        aria-label="Platform"
                    >
                        <ToggleButton value="input">Text</ToggleButton>
                        <ToggleButton value="time">Time</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            }
            <Grid item xs={12}>
                <FieldArray
                    name="dose_time"
                    render={(arrayHelpers) => (
                        <>
                            <Grid container spacing={2} >
                                {(values.dose_time)
                                    .map((_row: any, index: number) => {
                                        return (<Grid item xs={doseTimeInputType === 'input' ? 12 : 6}>
                                            <Grid container >
                                                {values.frequency === 'daily' &&
                                                    <Grid item xs={10}>
                                                        <FormControl
                                                            label={`Dose Time ${index + 1}`}
                                                            control={doseTimeInputType as Control}
                                                            name={`dose_time.${index}`}
                                                            type={doseTimeInputType === 'input' ? 'text' : 'number'}
                                                        />
                                                    </Grid>
                                                }
                                                {
                                                    values.frequency === 'weekly' &&
                                                    <Grid item xs={10}>
                                                        <FormControl
                                                            label={`Dose Time ${index + 1}`}
                                                            control='select'
                                                            name={`dose_time.${index}`}
                                                            type='text'
                                                            options={weeklyDoseTimeOptions}
                                                        />
                                                    </Grid>
                                                }
                                                {
                                                    values.frequency === 'monthly' &&
                                                    <Grid item xs={10}>
                                                        <FormControl
                                                            label={`Dose Time ${index + 1}`}
                                                            control='date'
                                                            name={`dose_time.${index}`}
                                                            type='text'
                                                        />
                                                    </Grid>
                                                }

                                                {index > 0 && (
                                                    <Grid item xs={2} >
                                                        <IconButton size="small" color="error"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </Grid>
                                        )
                                    })}

                                {values.frequency &&
                                    <Grid item xs={12}>
                                        <Button onClick={() => {
                                            arrayHelpers.push(serverAcceptedTime(dayjs()))
                                        }} size="small">
                                            <Add /> Add Dose Time
                                        </Button>
                                    </Grid>
                                }

                            </Grid>


                        </>
                    )}
                />
            </Grid>
        </Grid>
    )
}

export default DoseFieldArray;