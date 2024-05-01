import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";

import FormControl, {
  Control,
  FieldType,
} from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { capitalizeFirstLetter } from "../../../../../services/text-format";
import { mealIcons } from "../../../../../components/icons/icons";
import { serverAcceptedDate } from "../../../../../services/date-format";

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
      // const {
      //   user_id,
      //   diet_date,
      //   breakfast,
      //   middaymeal,
      //   evening,
      //   lunch,
      //   dinner,
      //   id,
      //   water,
      // } = data;

      const {
        user_id,
        id,
        diet_date,
        diets,
        water,
        water_consumed,
      } = data
      initialValues = {
        user_id,
        id,
        diet_date: diet_date || serverAcceptedDate(dayjs()),
        diets,
        water,
        water_consumed,
      };
      break;
    default:
      initialValues = {
        user_id: userId,
        diet_date: serverAcceptedDate(dayjs()),
        diets: ['breakfast', 'middaymeal', 'lunch', 'evening', 'dinner'].map((meal: string) => ({
          type: meal,
          time: "",
          item: "",
          calorie_count: 0,
          portion_size: "",
          fats: "",
          proteins: "",
          carbs: "",
          is_consumed: false,
        })
        ),
        water: "",
        water_consumed: ""
      };
  }

  const mealContents: {
    title: string;
    id: string;
    values: {
      xs: 3 | 6 | 12;
      name: string;
      control: Control;
      type: FieldType;
      label: string;
    }[];
  }[] = ["breakfast", 'middaymeal', 'lunch', 'evening', 'dinner'].map((mealtime, ind) => ({
    title: capitalizeFirstLetter(mealtime),
    id: mealtime,
    values: [
      {
        name: `diets[${ind}].item`,
        // name: `${mealtime}[${ind}].item`,
        label: "Item",
        control: "input",
        type: "text",
        xs: 12,
      },
      {
        name: `diets[${ind}].time`,
        label: "Time",
        control: "time",
        defaultValue: "",
        type: "text",
        xs: 12,
      },
      // {
      //   name: `diets[${ind}].time`,
      //   label: "End Time",
      //   control: "time",
      //   defaultValue: "",
      //   type: "text",
      //   xs: 6,
      // },
      {
        name: `diets[${ind}].portion_size`,
        label: "Portion Size",
        control: "input",
        type: "text",
        xs: 12,
      },
      {
        name: `diets[${ind}].calorie_count`,
        label: "TCL",
        control: "input",
        type: "number",
        xs: 6,
      },
      {
        name: `diets[${ind}].fats`,
        label: "Fats",
        control: "input",
        type: "text",
        xs: 6,
      },
      {
        name: `${mealtime}.proteins`,
        label: "Proteins",
        control: "input",
        type: "text",
        xs: 6,
      },
      {
        name: `diets[${ind}].carbs`,
        label: "Carbs",
        control: "input",
        type: "text",
        xs: 6,
      },

    ],
  }))





  const renderForm = (
    <Formik
      // validationSchema={AllergiesValiation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {() => (
        <Form className="">
          <Grid container spacing={1} columns={5}>
            {mealContents.map((meal) => (
              <Grid item xs={5} md={2.5} lg={1} >
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    border: 1,
                    borderColor: "borderColor",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Grid container spacing={1.5}>
                        <Grid xs={12}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            gap={1}
                          >
                            {mealIcons[meal.id]}
                            <Typography>{meal.title}</Typography>
                          </Grid>
                        </Grid>
                        {meal.values.map((m) => (
                          <Grid item xs={m.xs}>
                            <FormControl
                              control={m.control}
                              label={m.label}
                              name={m.name}
                              type={m.type}
                            />
                          </Grid>
                        ))}


                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid mt={1} container spacing={1}>
            <Grid item xs={12} md={3}>
              <FormControl
                control={"date"}
                label={"Name"}
                name={"diet_date"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl
                control={"input"}
                label={"Water (In No of Glasses"}
                name={"water"}
                type={"number"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack direction="row" justifyContent="end">
                <Button
                  disabled={isLoading}
                  type="submit"
                  endIcon={<Done />}
                  variant="outlined"
                >
                  {type === "add" ? "Submit" : "Update"}
                </Button>
              </Stack>

            </Grid>
          </Grid>

        </Form>
      )}
    </Formik>
  );
  return <Box>{renderForm}</Box>;
}

export default ModalContent;
