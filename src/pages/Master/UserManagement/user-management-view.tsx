import { Box } from "@mui/material";
import { RoleTable } from "../../../modules/Master/User/Table";


export default function UserManagementView() {
  return (
    <Box>

      <RoleTable tableName="Users" />
    </Box>
  );
}
