import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Box, Grid, Stack } from "@mui/material";

import FormControl from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { AllergiesValiation } from "../../../../../services/validation/form/allergies";
import { useLocation } from "react-router-dom";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);
  const {
    state: { id: userId },
  } = useLocation();


  let initialValues;
  switch (type) {
    case "edit":
      const {
        name,
        user_id,
        icon,
        percent,
        symptoms,
        treatment,
        diagnose,
        link,
        id,
      } = data;
      initialValues = {
        name,
        user_id,
        icon,
        percent,
        symptoms,
        treatment,
        diagnose,
        link,
        id,
      };
      break;
    default:
      initialValues = {
        name: "",
        user_id: userId,
        icon: "",
        percent: 0,
        symptoms: [""],
        treatment: "",
        diagnose: "",
        link: "",
      };
  }

  const renderForm = (
    <Formik
      validationSchema={AllergiesValiation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {() => (
        <Form className="">
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
              <FormControl
                control={"input"}
                label={"Icon"}
                name={"icon"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Percent"}
                name={"percent"}
                type={"number"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Symptoms"}
                name={"symptoms"}
                type={"text"}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Treatment"}
                name={"treatment"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Diagnose"}
                name={"diagnose"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Link"}
                name={"link"}
                type={"text"}
              />
            </Grid>
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
