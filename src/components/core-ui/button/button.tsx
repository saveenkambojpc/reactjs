import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = React.PropsWithChildren<MuiButtonProps>;

export default function Button({ children, ...other }: ButtonProps) {
  return <MuiButton {...other}>{children}</MuiButton>;
}