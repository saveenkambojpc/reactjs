import { Box } from "@mui/material";
import { DietTable } from "../../../modules/Master/Diet/Table";
import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../../components/core-ui/breadcrumbs";

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
          { label: "Diet", to: "" },
        ]}
      />
      <DietTable tableName="Diet" filterByUserId={user.id} />
    </Box>
  );
}
