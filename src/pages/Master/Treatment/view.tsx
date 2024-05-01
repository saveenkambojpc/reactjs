import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../../components/core-ui/breadcrumbs";
import FeatureCard from "../../../modules/FamilyProfile/NewMemberDetail/feature-card/feature-card";

export default function View() {
  const {
    state: { user },
  } = useLocation();
  return (
    <Box>
      <Breadcrumbs
        arr={[
          { label: "Family Profile", to: "/family-profile" },
          { label: user.name, to: "/family-profile/" + user.id, state: user },
          { label: "Treatment", to: "" },
        ]}
      />

      <Box mt={3}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <FeatureCard
              data={{
                title: "Document",
                id: "document",
                parent: "Treatment",
                parentPath: "/treatment",
              }}
              user={user}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
