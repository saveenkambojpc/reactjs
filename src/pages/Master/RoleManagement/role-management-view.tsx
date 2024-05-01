import { Box } from "@mui/material";
import { RoleTable } from "../../../modules/Master/Role/Table";

export default function RoleManagementView() {
  return (
    <Box>
      <RoleTable tableName="Role" />
    </Box>
  );
}
