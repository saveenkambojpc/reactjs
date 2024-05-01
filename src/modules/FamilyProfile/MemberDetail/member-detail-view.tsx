import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Box, Card, Grid, Stack } from "@mui/material";
import FormControl from "../../../components/core-ui/formik/FormControl";
import { Button } from "../../../components/core-ui/button";
import { UserModel } from "../../../types/api/UserModel";
import { Breadcrumbs } from "../../../components/core-ui/breadcrumbs";
import { DrawChart } from "../../../components/chart";
import DummyUserImage from "/assets/images/avatars/dummy.png"
import Tabs from "../../../components/core-ui/tabs/tabs";
import { tabs } from "./tabs/tabs";


export default function MemberDetailView() {
  const { state: data }: { state: UserModel } = useLocation();
  const type = "edit";

  let initialValues;
  switch (type) {
    case "edit":
      initialValues = {
        id: data.id,
        name: data.name,
        phone_number: data.phone_number,
        email: data.email,
        dob: data.dob,
        designation: data.designation,
        height: data.height,
        weight: data.weight,
        gender: data.gender,
      };
      break;
    default:
      initialValues = {
        name: "",
      };
  }

  const validation = Yup.object({});

  // name, label, control, type
  const contents = [
    ["name", "Name", "input", "text"],
    ["phone_number", "Phone Number", "input", "text"],
    ["email", "Email", "input", "text"],
    ["gender", "Gender", "input", "text"],
    ["height", "Height", "input", "text"],
    ["weight", "Weight", "input", "text"],
    ["dob", "DOB", "input", "text"],
    ["Designation", "Designation", "input", "text"],
  ];

  return (
    <Box>
      <Breadcrumbs
        arr={[
          { label: "Family Profile", to: "/family-profile" },

          { label: data.name, to: "dd" },
        ]}
      />

      <Formik
        validationSchema={validation}
        initialValues={initialValues}
        onSubmit={() => { }}
      >
        {() => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 3 }}>
                  <Grid container justifyContent={"center"}>
                    <Box sx={{ width: 120, }}>
                      <img
                        alt="icon"
                        style={{ borderRadius: "50%", height: "inherit", margin: 'auto' }}
                        src={DummyUserImage}
                      />
                    </Box>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    {contents.map((item: any, ind) => (
                      <Grid item xs={12} md={6} key={ind}>
                        <FormControl
                          name={item[0]}
                          label={item[1]}
                          control={item[2]}
                          type={item[3]}
                        />
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <Button
                        disabled={false}
                        type="submit"
                        endIcon={<Done />}
                        variant="contained"
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            <Stack mt={3} direction="row" justifyContent="center"></Stack>
          </Form>
        )}
      </Formik>


      <Grid mt={1} container spacing={3}>
        <Grid xs={12} md={4} item>
          <DrawChart
            title="Health Performance"
            subheader=""
            chart={{
              labels: [
                '02/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={4} item>
          <DrawChart
            title="Oxygen"
            subheader=""
            chart={{
              labels: [
                '02/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Oxygen',
                  type: 'area',
                  fill: 'gradient',

                  data: [30, 25, 36, 30, 45, 35, 22, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={4} item>
          <DrawChart
            title="Heart Beat"
            subheader=""
            chart={{
              labels: [
                '02/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Heart Beat',
                  type: 'line',
                  fill: 'area',
                  data: [30, 25, 36, 30, 45, 35, 22, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>

      <Tabs tabs={tabs} initialSelectedTabIndex={3}/>
    </Box>
  );
}
