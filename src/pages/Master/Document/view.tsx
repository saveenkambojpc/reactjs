import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "../../../components/core-ui/breadcrumbs";
import { DocumentTable } from "../../../modules/Master/Document/Table";

export default function View() {
  const {
    state: { user, data },
  } = useLocation();

  return (
    <Box>
      <Breadcrumbs
        arr={[
          { label: "Family Profile", to: "/family-profile" },
          { label: user.name, to: "/family-profile/" + user.id, state: user },
          { label: data.parent, to: "/family-profile/" + user.id + data.parentPath, state: { user } },
          { label: "Document", to: "" },
        ]}
      />

      <DocumentTable tableName="Document" />

    </Box>
  );
}
