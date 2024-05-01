import { Card, Grid, Typography } from "@mui/material";
import BPTrendChart from "../../card/chart/bp-trend";
import { Link } from "react-router-dom";
import { UserModel } from "../../../../types/api/UserModel";
import { featureIcons } from "../../../../components/icons/icons";


export default function FeatureCard({
  data,
  user,
}: {
  data: any;
  user: UserModel;
}) {
  return (
    <Link to={data.id} state={{ data, user }}>

      <Card sx={{ px: 3, py: 1, border: 1, borderColor: "divider" }}>
        <Typography textAlign="center" variant="h6">
          {data.title}
        </Typography>

        <Grid container alignItems="center">
          <Grid item xs={2} md={3}>
            {featureIcons[data.id]}
          </Grid>
          <Grid item xs={10} md={9}>
            {/* {(data.id === "diet" || data.id === "treatment") && <BPTrendChart />} */}
            <BPTrendChart />
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}
