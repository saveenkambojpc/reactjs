import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

interface IconButtonProps extends MuiIconButtonProps {
  children: React.ReactNode;
}

export default function IconButton({ children, ...others }: IconButtonProps) {
  return (
    <MuiIconButton {...others} sx={{ ...others.sx }}>
      {children}
    </MuiIconButton>
  );
}
