import { Box, Grid, Typography } from "@mui/material";
// import FamilyProfileCard from "./family-profile-card";
import { useGetFamilyProfilesQuery } from "../../services/api/userApi";
import { Breadcrumbs } from "../../components/core-ui/breadcrumbs";
import { Backdrop } from "../../components/core-ui/backdrop";
import FamilyProfileCard from "./card/family-profile-card";

export default function FamilyProfileView() {
  const { data: users = [], isLoading } = useGetFamilyProfilesQuery();
  const pageTitle = "Family Profile";

  return (
    <Box>
      <Backdrop open={isLoading} />
      <Breadcrumbs arr={[{ label: pageTitle, to: "/family-profile" }]} />
      {/* <PageTitleWrapper>
        <PageTitle title={pageTitle} />
      </PageTitleWrapper> */}

      {/* <Grid container spacing={3}>
        {users.map((member) => (
          <Grid key={member.id} item xs={12} sm={6} md={4}>
            <FamilyProfileCard  data={member} />
          </Grid>
        ))}
      </Grid> */}

      <Box>
        <Box>
          <Typography textAlign="center">
            Welcome Maker 1!

          </Typography>
          <Typography textAlign="center">
            Please choose the member for which you wish to update data.

          </Typography>
        </Box>

        <Box mt={3}>
          <Grid container spacing={3}>
            {users.map(user =>
              <Grid xs={12} md={6} item>
                <FamilyProfileCard data={user} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
