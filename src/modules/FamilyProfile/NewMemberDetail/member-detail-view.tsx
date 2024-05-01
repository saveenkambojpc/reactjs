import { useLocation} from "react-router-dom";
import { PageTitle, PageTitleWrapper } from "../../../pages/Utils";
import { Box, Grid, Typography } from "@mui/material";
import { UserModel } from "../../../types/api/UserModel";
import FeatureCard from "./feature-card/feature-card";
import { Breadcrumbs } from "../../../components/core-ui/breadcrumbs";

export default function MemberDetailView() {
  // const { id } = useParams();
  const { state }: { state: UserModel } = useLocation();

  const features = [
    { title: "Planned Diet", id: 'diet' },
    { title: "Treatment Management", id: "treatment" },
    { title: "Medication", id: "medication" },
    // { title: "Document", id: "document" },

  ];
  return (
    <div>
      <Breadcrumbs
        arr={[
          { label: "Family Profile", to: "/family-profile" },
          { label: state.name, to: "" },
        ]}
      />
      <PageTitleWrapper>
        <PageTitle title="Member Details" />
      </PageTitleWrapper>

      <Typography variant="h6" fontWeight={600} textAlign="center">
        {state.name}
      </Typography>


      <table>
        {[["Weight", `: ${state.weight}Kg`],
        ["BP", `: 110/80 mmHg`],
        ["Sugar", `: 125 mg/dL`],


        ].map(row => {
          return (
            <tr>
              <td>
                <Typography fontWeight={500}>{row[0]}</Typography>
              </td>
              <td>
                <Typography fontWeight={400}> {row[1]}</Typography>
              </td>
            </tr>
          )
        })}
      </table>

      <Box mt={1}>
        <Typography textAlign="center">
          Please choose the feature for which you wish to update data.
        </Typography>
      </Box>
      <Grid mt={0} container spacing={3}>
        {features.map((data) => (
          <Grid xs={12} md={6} item>
            <FeatureCard data={data} user={state} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
