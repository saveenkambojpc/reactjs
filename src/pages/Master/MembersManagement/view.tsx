import { Box } from "@mui/material";
import { MembersTable } from "../../../modules/Master/Members/Table";
import { useGetUsersQuery } from "../../../services/api/userApi";

export default function View() {
    useGetUsersQuery();
    return (
        <Box>
            <MembersTable tableName="Members" />
        </Box>
    );
}
