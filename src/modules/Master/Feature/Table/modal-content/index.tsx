import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Box, Grid, Stack } from "@mui/material";

import FormControl from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { TextField } from "../../../../../components/core-ui/input";
import { dateTimeFormatOut } from "../../../../../services/date-format";
import { FeatureValidation } from "../../../../../services/validation/form/feature";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);

  let initialValues;
  switch (type) {
    case "edit":
      const { name, description, active, id } = data;
      initialValues = {
        name,
        description,
        active,
        id,
      };
      break;
    default:
      initialValues = {
        name: "",
        description: "",
        active: true,
      };
  }
  let disabledFields: { label: string; value: string }[];

  if (type === "edit") {
    disabledFields = [
      {
        label: "Created by",
        value: data.created_by,
      },
      {
        label: "Created at",
        value: dateTimeFormatOut(data.created_at),
      },
      {
        label: "Updated by",
        value: data.updated_by,
      },
      {
        label: "Updated at",
        value: dateTimeFormatOut(data.updated_at),
      },
    ];
  }

  const renderForm = (
    <Formik
      validationSchema={FeatureValidation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {() => (
        <Form className="">
          <Grid container spacing={3}>
            <Grid item xs={12} md={type === "edit" ? 6 : 12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <FormControl
                    control={"input"}
                    label={"Name"}
                    name={"name"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    control={"input"}
                    label={"Description"}
                    name={"description"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl
                    control={"checkbox"}
                    label={"Active"}
                    name={"active"}
                  />
                </Grid>
              </Grid>
            </Grid>

            {type === "edit" && (
              <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                  {disabledFields.map((item) => (
                    <Grid item xs={12} md={12}>
                      <TextField
                        disabled
                        label={item.label}
                        value={item.value}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
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
