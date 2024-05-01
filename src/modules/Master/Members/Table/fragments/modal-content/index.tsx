import { FieldArray, Form, Formik } from "formik";
import { Add, Done } from "@mui/icons-material";
import { TextField as MuiTextField } from "@mui/material";

import {
  Box,
  Grid,
  Stack,
  Autocomplete,
} from "@mui/material";

import FormControl from "../../../../../../components/core-ui/formik/FormControl";
import { Button, IconButton } from "../../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectModalState } from "../../../../../../store/features/modalSlice";
import { TextField } from "../../../../../../components/core-ui/input";
import { dateTimeFormatOut } from "../../../../../../services/date-format";
import { MemberValidation } from "../../../../../../services/validation/form/member";
import { genderOptions } from "../../../../../../constants/options";
import { DeleteIcon } from "../../../../../../components/icons/icons";
import { useGetUsersQuery } from "../../../../../../services/api/userApi";
import { useGetRolesQuery } from "../../../../../../services/api/roleApi";
import { useGetFeaturesQuery } from "../../../../../../services/api/feature";
import dayjs from "dayjs";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);
  const { data: users = [] } = useGetUsersQuery();
  const { data: roles = [] } = useGetRolesQuery();
  const { data: allFeatures = [] } = useGetFeaturesQuery();

  const userOptions = users.reduce((
    acc: any,
    curr: any
  ) => {
    curr.roles.forEach((role_id: string) => {
      let role = roles.find(obj => obj.id === role_id);
      if (role) {
        let scopes = role.scopes;
        if (scopes.member_admin) {
          acc.memberAdmin.push({ label: curr.name, id: curr.id });
        }
        if (scopes.maker) {
          acc.makers.push({ label: curr.name, id: curr.id });
        }
        if (scopes.checker) {
          acc.checkers.push({ label: curr.name, id: curr.id });
        }
      }
    });
    return acc;
  }, { memberAdmin: [], makers: [], checkers: [] });


  const featuresOption = allFeatures.map(obj => (
    { label: obj.name, value: obj.id }
  ))


  // let a = data.features.reduce((acc: any, curr: any) => {
  //   let makers = curr.makers?.map((obj: any) => {
  //     let name = users.find(obj1 => obj1.id === obj.id)
  //     return { label: name, id: obj.id }
  //   })
  //   let checkers = curr.checkers?.map((obj: any) => {
  //     let name = users.find(obj1 => obj1.id === obj.id)
  //     return { label: name, id: obj.id }
  //   })
  //   acc.push({ ...curr, makers, checkers })
  //   return acc
  // }, [])

  // console.log(a, 'a')


  let initialValues;
  switch (type) {
    case "edit":
      const {
        name, username, email, phone_number, gender, dob, height, weight, designation, id,
        features, member_admin_id
      } = data;

      initialValues = {
        id,
        name,
        username,
        email,
        phone_number,
        gender,
        height,
        weight,
        designation,
        features: features.reduce((acc: any, curr: any) => {
          let makers = curr.makers?.map((obj: any) => {
            let name = users.find(obj1 => obj1.id === obj.id)?.name
            return { label: name, id: obj.id }
          })
          let checkers = curr.checkers?.map((obj: any) => {
            let name = users.find(obj1 => obj1.id === obj.id)?.name
            return { label: name, id: obj.id }
          })
          acc.push({ ...curr, makers, checkers })
          return acc
        }, []),

        member_admin_id: member_admin_id.reduce((acc: any, curr: any) => {
          let label = users.find(obj => obj.id === curr)?.name;
          acc.push({ label, value: curr })
        }, []),

        dob
      };
      break;
    default:
      initialValues = {
        name: '',
        username: '',
        email: '',
        phone_number: '+91',
        gender: '',
        height: '',
        weight: '',
        dob: dayjs().format('YYYY-MM-DD'),
        features: [
          {
            id: '',
            name: 'String',
            active: true,
            makers: [],
            checkers: []
          }
        ],
        designation: 'SDE',
        member_admin_id: []
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

  const renderForm = (
    <Formik
      validationSchema={MemberValidation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {({ values, setFieldValue }) => (
        <Form className="">
          <Grid container spacing={5}>
            <Grid item xs={12} md={type === 'edit' ? 8 : 12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Name"
                    name="name"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Email"
                    name="email"
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Phone Number"
                    name="phone_number"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Designation"
                    name="designation"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    control="select"
                    label="Gender"
                    name="gender"
                    type="text"
                    options={genderOptions}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    control="date"
                    label="DOB"
                    name="dob"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Height (in cm or ft)"
                    name="height"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormControl
                    control="input"
                    label="Weight (in Kgs)"
                    name="weight"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} md={9}>
                  <Autocomplete
                    multiple
                    size="small"
                    value={values.member_admin_id}
                    options={userOptions.memberAdmin}
                    onChange={(_event: any, newValue: any) => {
                      setFieldValue('member_admin_id', newValue);
                    }}
                    renderInput={(params) => (
                      <MuiTextField
                        placeholder='Press Enter add'
                        label="Member Admins"
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            {type === "edit" && <Grid item xs={4} md={3}>
              <Grid container spacing={3}>
                {disabledFields.map(item =>
                  <Grid item xs={12} md={12}>
                    <TextField disabled label={item.label} value={item.value} />
                  </Grid>
                )}

              </Grid>
            </Grid>}
            <Grid item xs={12} md={12} ml={2}>
              <FieldArray
                name="features"
                render={(arrayHelpers) => (
                  <>
                    <Grid container spacing={2} >
                      {values.features?.map((_row: any, index: number) => {
                        return (
                          <Grid container spacing={1}>
                            <Grid item xs={12} mt={2} md={4}>
                              <FormControl
                                label={`Feature ${index + 1}`}
                                control='select'
                                name={`features.${index}.id`}
                                type='text'
                                options={featuresOption}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Autocomplete
                                multiple
                                size="small"
                                value={values.features[index].makers}
                                options={userOptions.makers}
                                onChange={(_event: any, newValue: any) => {
                                  setFieldValue(`features.${index}.makers`, newValue);
                                }}
                                renderInput={(params) => (
                                  <MuiTextField
                                    margin="normal"
                                    placeholder='Press Enter add'
                                    label="Makers"
                                    {...params}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Autocomplete
                                multiple
                                size="small"
                                value={values.features[index].checkers}
                                options={userOptions.checkers}
                                onChange={(_event: any, newValue: any) => {
                                  setFieldValue(`features.${index}.checkers`, newValue);
                                }}
                                renderInput={(params) => (
                                  <MuiTextField
                                    margin="normal"
                                    placeholder='Press Enter add'
                                    label="Checkers"
                                    {...params}
                                  />
                                )}
                              />
                            </Grid>

                            {index > 0 && (
                              <Grid item xs={2} mt={2}>
                                <IconButton size="small" color="error"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            )}
                          </Grid>
                        )
                      })}

                      {values.features &&
                        <Grid item xs={12}>
                          <Button onClick={() => {
                            arrayHelpers.push({
                              id: '',
                              name: '',
                              active: true,
                              makers: [],
                              checkers: []
                            })
                          }} size="small">
                            <Add /> Add Features
                          </Button>
                        </Grid>
                      }

                    </Grid>


                  </>
                )}
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
