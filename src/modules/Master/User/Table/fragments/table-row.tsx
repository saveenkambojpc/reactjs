import {
  Avatar,
  TableRow as MuiTableRow,
  Stack,
  TableCell,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { openModal } from "../../../../../store/features/modalSlice";
import { useDispatch } from "react-redux";
import { IconButton } from "../../../../../components/core-ui/button";
import { DeleteIcon, EditIcon } from "../../../../../components/icons/icons";
import { UserModel } from "../../../../../types/api/UserModel";
import { dateTimeFormatOut } from "../../../../../services/date-format";

export default function TableRow({
  isSelected,
  row,
  index,
  handleClick,
}: {
  isSelected: (arg0: any) => boolean | undefined;
  row: UserModel;
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

      <TableCell align="left">
        {row.image_uri ? (
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 24, height: 24 }}
            src={row.image_uri}
          />
        ) : (
          <Avatar sx={{ width: 24, height: 24 }}>{row.name.charAt(0)}</Avatar>
        )}
      </TableCell>

      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="left">{row.email}</TableCell>
      <TableCell align="left">{row.phone_number}</TableCell>
      <TableCell align="left">{dateTimeFormatOut(row.created_at)}</TableCell>

      <TableCell align="right">
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
