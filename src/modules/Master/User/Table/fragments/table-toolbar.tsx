import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableToolbarWrapper } from "../../../../../components/core-ui/table";
import { Dispatch, SetStateAction } from "react";
import { SearchOutlinedInput } from "../../../../../components/core-ui/input";

interface EnhancedTableToolbarProps {
  numSelected: number;
  filter: [string, Dispatch<SetStateAction<string>>];
}

export function TableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, filter } = props;

  return (
    <TableToolbarWrapper numSelected={numSelected}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <SearchOutlinedInput value={filter[0]} onChange={(v) => filter[1](v)} />

      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </TableToolbarWrapper>
  );
}
