import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";

import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl as MuiFormControl,
} from "@mui/material";

import FormControl from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { TextField } from "../../../../../components/core-ui/input";
import { dateTimeFormatOut, serverAcceptedDate } from "../../../../../services/date-format";
import { useLocation } from "react-router-dom";
import { MedicationValidation } from "../../../../../services/validation/form/medication";
import dayjs from "dayjs";
import { MedicationFrequencyOptions, MedicationMealTimingOptions, doseTimeFreqDic } from "../../../../../constants/options";
import DoseFieldArray from "./DoseFieldArray";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);

  const {
    state: {
      user: { id: userId },
    },
  } = useLocation();

  let initialValues;
  switch (type) {
    case "edit":
      const {
        name, frequency, dose_time_freq, dose_time, start_date, end_date, meal_timing, remarks, id, prescribed_by
      } = data;

      initialValues = {
        id,
        member_id: userId,
        name,
        frequency,
        dose_time_freq,
        dose_time,
        start_date: start_date || serverAcceptedDate(dayjs()),
        end_date: end_date || serverAcceptedDate(dayjs()),
        meal_timing,
        remarks,
        prescribed_by
      };
      break;
    default:
      initialValues = {
        member_id: userId,
        name: "",
        frequency: "",
        dose_time_freq: 0,
        dose_time: [''],
        start_date: serverAcceptedDate(dayjs()),
        end_date: serverAcceptedDate(dayjs()),
        meal_timing: "",
        remarks: "",
        prescribed_by: ""
      };
  }
  let disabledFields: { label: string, value: string }[];

  if (type === "edit") {
    disabledFields = [
      {
        label: "Created by",
        value: data.created_by
      },
      {
        label: "Created at",
        value: dateTimeFormatOut(data.created_at)
      },
      {
        label: "Updated by",
        value: data.updated_by
      },
      {
        label: "Updated at",
        value: dateTimeFormatOut(data.updated_at)
      },
    ]
  }

  const handleFrequencySelect = (setFieldValue: any, e: any) => {
    const value = e.target.value as string;
    let doseFrequency: number = doseTimeFreqDic[value];
    let doseTime: string[] = [];
    setFieldValue('frequency', value);
    setFieldValue('dose_time_freq', doseFrequency);
    for (let i = 0; i < doseFrequency; i++) {
      doseTime.push('');
    }
    setFieldValue('dose_time', doseTime);
  }

  const handleFrequencyChange = (setFieldValue: any, e: any) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      let doseTime: string[] = [];
      for (let i = 0; i < value; i++) {
        doseTime.push('');
      }
      setFieldValue('dose_time', doseTime);
      setFieldValue('dose_time_freq', value)
    }
    else {
      setFieldValue('dose_time', ['']);
      setFieldValue('dose_time_freq', '')
    }
  }


  const renderForm = (
    <Formik
      validationSchema={MedicationValidation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="">
          <Grid container spacing={3}>
            <Grid item xs={12} md={type === "edit" ? 9 : 12}>

              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        control={"input"}
                        label={"Name"}
                        name={"name"}
                        type={"text"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <SelectField
                        options={MedicationFrequencyOptions}
                        onChange={(e) => handleFrequencySelect(setFieldValue, e)}
                        label="Frequency"
                        name="frequency"
                        {...rest}
                      /> */}

                      <MuiFormControl fullWidth size='small'>
                        <InputLabel>Frequency</InputLabel>
                        <Select
                          error={errors.frequency && touched.frequency ? true : false}
                          label="Frequency"
                          size='small'
                          value={values.frequency}
                          onChange={(e) => handleFrequencySelect(setFieldValue, e)}
                        >
                          {MedicationFrequencyOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {/* {errors.frequency && touched.frequency &&
                          <FormHelperText error>
                            {errors.frequency}
                          </FormHelperText>
                        } */}
                      </MuiFormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        type='number'
                        label='Dose Time Freq'
                        value={values.dose_time_freq}
                        onChange={(e) => handleFrequencyChange(setFieldValue, e)}
                        error={touched.dose_time_freq && Boolean(errors.dose_time_freq)}
                        helperText={errors.dose_time_freq}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        control={"select"}
                        label={"Meal Timing"}
                        name={"meal_timing"}
                        type={"text"}
                        options={MedicationMealTimingOptions}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        control={"date"}
                        label={"Start Date"}
                        name={"start_date"}
                        type={"text"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        control={"date"}
                        label={"End Date"}
                        name={"end_date"}
                        type={"text"}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormControl
                        control={"input"}
                        label={"Remarks"}
                        name={"remarks"}
                        type={"text"}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        control={"input"}
                        label={"Prescribed By"}
                        name={"prescribed_by"}
                        type={"text"}
                      />
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12} md={4}>
                  <DoseFieldArray
                    values={values}
                  />
                </Grid>
              </Grid>
            </Grid>

            {type === "edit" && <Grid item xs={12} md={3}>
              <Grid container spacing={3}>
                {disabledFields.map(item =>
                  <Grid item xs={12} md={12}>
                    <TextField disabled label={item.label} value={item.value} />
                  </Grid>
                )}

              </Grid>
            </Grid>}
          </Grid>

          <Stack mt={3} direction="row" justifyContent="center">
            <Button
              disabled={isLoading}
              type="submit"
              endIcon={<Done />}
              variant="outlined"
            >
              {type === "add" ? "Submit" : "Update"}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
  return <Box>{renderForm}</Box>;
}

export default ModalContent;
