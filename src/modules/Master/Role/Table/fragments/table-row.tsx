import { TableRow as MuiTableRow, Stack, TableCell } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { openModal } from "../../../../../store/features/modalSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "../../../../../components/core-ui/button";
import {
  ActiveIcon,
  DeleteIcon,
  EditIcon,
  InActiveIcon,
} from "../../../../../components/icons/icons";
import { RoleModel } from "../../../../../types/api/RoleModel";
import { dateTimeFormatOut } from "../../../../../services/date-format";

export default function TableRow({
  isSelected,
  row,
  index,
  handleClick,
}: {
  isSelected: (arg0: any) => boolean | undefined;
  row: RoleModel;
  index: number;
  handleClick: (arg0: any, arg1: any) => void;
}) {
  const dispatch = useDispatch();
  const isItemSelected = isSelected(row.id);
  const labelId = `enhanced-table-checkbox-${index}`;

  const handleOpenModalForEdit = (data: object) => {
    dispatch(openModal({ type: "edit", data }));
  };
  const handleOpenModalForDelete = (data: object) => {
    dispatch(openModal({ type: "delete", data }));
  };

  return (
    <MuiTableRow
      hover
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          onClick={(event: any) => handleClick(event, row.id)}
          color="primary"
          checked={isItemSelected}
          inputProps={{
            "aria-labelledby": labelId,
          }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
      {/* <TableCell>
        {row.scopes.admin ? <ActiveIcon /> : <InActiveIcon />}
      </TableCell>
      <TableCell>
        {row.scopes.editor ? <ActiveIcon /> : <InActiveIcon />}
      </TableCell>
      <TableCell>
        {row.scopes.viewer ? <ActiveIcon /> : <InActiveIcon />}
      </TableCell> */}
      {[row.scopes.admin, row.scopes.editor, row.scopes.viewer, row.scopes.member, row.scopes.it_admin, row.scopes.family_admin, row.scopes.member_admin, row.scopes.maker, row.scopes.checker].map(i => <TableCell>
        {i ? <ActiveIcon /> : <InActiveIcon />}
      </TableCell>)}

      <TableCell align="left">{dateTimeFormatOut(row.updated_at)}</TableCell>
      <TableCell>
        {row.updated_by}
      </TableCell>

      <TableCell align="left">
        <Stack direction="row" gap={1}>
          <IconButton size="small" onClick={() => handleOpenModalForEdit(row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenModalForDelete(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </TableCell>
    </MuiTableRow>
  );
}
