import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Box, Grid, Stack } from "@mui/material";

import FormControl from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { UserValidation } from "../../../../../services/validation/form/user";
import { MultiSelectInput, TextField } from "../../../../../components/core-ui/input";
import { useGetRolesQuery } from "../../../../../services/api/roleApi";
import { RoleModel } from "../../../../../types/api/RoleModel";
import DummyUserImage from '/assets/images/avatars/dummy.png'
import { dateTimeFormatOut } from "../../../../../services/date-format";
import { genderOptions } from "../../../../../constants/options";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);

  const { data: roles = [] } = useGetRolesQuery();

  let initialValues;
  switch (type) {
    case "edit":
      const {
        id,
        name,
        designation,
        email,
        phone_number,
        gender,
        dob,
        height,
        weight,
        username,
      } = data;
      initialValues = {
        id,
        name,
        designation,
        email,
        phone_number,
        gender,
        dob,
        height,
        weight,
        username,
        roles: data.roles.map((id: string) => ({
          id,
          title: roles.find((role) => role.id === id)?.name,
        })),
      };
      break;
    default:
      initialValues = {
        name: "",
        designation: "",
        email: "",
        phone_number: "+91",
        gender: "",
        dob: "2023-04-04",
        height: "",
        weight: "",
        username: '',
        roles: [],
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
      {
        label: "Last Login Timestamp",
        value: data.last_login_timestamp
      },
    ]
  }

  const renderForm = (
    <Formik
      validationSchema={UserValidation}
      initialValues={initialValues}
      onSubmit={(vals) => {
        const updatedValues = { ...vals, roles: vals.roles.map((role: any) => role.id) }
        handleAddUpdate(updatedValues)
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="">
          <Grid container spacing={3}>
            <Grid item xs={12} md={type === "edit" ? 3 : 4}>
              <Grid container justifyContent={"center"}>
                <Box sx={{ width: 120, }}>
                  <img
                    alt="icon"
                    style={{ borderRadius: "50%", height: "inherit", margin: 'auto' }}
                    src={DummyUserImage}
                  />
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} md={type === "edit" ? 6 : 8}>
              <Grid container spacing={3}>
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
                    label={"Designation"}
                    name={"designation"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    control={"input"}
                    label={"Username"}
                    name={"username"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    control={"input"}
                    label={"Height (in cm or ft)"}
                    name={"height"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl
                    control={"input"}
                    label={"Weight (in Kgs)"}
                    name={"weight"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    control={"input"}
                    label={"Email Address"}
                    name={"email"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    control={"input"}
                    label={"Phone Number"}
                    name={"phone_number"}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    control="select"
                    label="Gender"
                    name="gender"
                    type="text"
                    options={genderOptions}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    control={"date"}
                    label={"DOB"}
                    name={"dob"}
                    type={"text"}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <MultiSelectInput
                    label="Roles"
                    selectedOptions={values.roles}
                    onChange={(v) => setFieldValue("roles", v)}
                    options={roles.map((role: RoleModel) => ({
                      title: role.name,
                      id: role.id,
                    }))}
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
