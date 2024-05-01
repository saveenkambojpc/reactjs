import { Stack} from "@mui/material";
import { PageTitle } from "../../../pages/Utils";

interface TableTitleWrapperProps {
  children: React.ReactNode;
  tableName: string;
}

export default function TableTitleWrapper({
  children,
  tableName,
}: TableTitleWrapperProps) {
  return (
    <Stack mb={2} direction="row" justifyContent="space-between">
      <PageTitle title={tableName + " Table"} />
      {children}
    </Stack>
  );
}
