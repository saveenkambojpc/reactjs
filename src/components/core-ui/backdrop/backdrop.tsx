import MuiBackdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type BackdropProps = {
  open: boolean;
  handleClose?: () => void;
};

export default function Backdrop({ open, handleClose }: BackdropProps) {
  return (
    <div>
      <MuiBackdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: "primary.main",
          background: "#00000030",
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </MuiBackdrop>
    </div>
  );
}
