import { Toolbar, alpha } from "@mui/material";

type TableToolbarWrapperProps = {
  numSelected: number;
  children: React.ReactNode;
};
export default function TableToolbarWrapper({
  numSelected,
  children,
}: TableToolbarWrapperProps) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {children}
    </Toolbar>
  );
}
