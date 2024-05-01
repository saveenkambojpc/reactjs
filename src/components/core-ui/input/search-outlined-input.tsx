import { Search } from "@mui/icons-material";
import {
  InputAdornment,
  OutlinedInput as MuiOutlinedInput,
} from "@mui/material";

interface SearchOutlinedInputProps {
  value: string | number;
  onChange: (value: string) => void;
}
export default function SearchOutlinedInput({ value, onChange }: SearchOutlinedInputProps) {
  return (
    <MuiOutlinedInput
      value={value}
      size="small"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search ..."
      startAdornment={
        <InputAdornment position="start">
          <Search sx={{ color: "text.disabled", width: 20, height: 20 }} />
        </InputAdornment>
      }
    />
  );
}
