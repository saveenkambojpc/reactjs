import Dialog from "@mui/material/Dialog";
import { Close } from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Box, useTheme, useMediaQuery, Breakpoint } from "@mui/material";
import { IconButton } from "../button";

// import { selectModalType } from 'src/store/features/modalSlice';
type ModalProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  content: React.ReactNode;
  maxWidth?: Breakpoint;
};

export default function Modal({
  open,
  handleClose,
  title = "",
  content,
  maxWidth,
}: ModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      maxWidth={maxWidth}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle textAlign="center" id="alert-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>
        <Box p={1}>{content}</Box>
      </DialogContent>
    </Dialog>
  );
}
