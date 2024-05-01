import { useDispatch } from "react-redux";
import { closeModal, selectModalState } from "../../store/features/modalSlice";
import { useAppSelector } from "../../store/hooks";
import Modal from "../core-ui/modal/modal";
import { Stack, Typography } from "@mui/material";
import { Warning } from "@mui/icons-material";
import { LoadingButton } from "../core-ui/button";

type DeleteWarningModalProps = {
  isLoading: boolean;
  onDelete: (arg1: any) => void;
};

export default function DeleteWarningModal({ isLoading, onDelete }: DeleteWarningModalProps) {
  const { type, data, visible } = useAppSelector(selectModalState);
  const dispatch = useDispatch();

  return (
    visible &&
    type === "delete" && (
      <Modal
      maxWidth="xs"
        open={visible}
        handleClose={() => dispatch(closeModal())}
        title="Are you sure?"
        content={
          <Stack>
            <Stack gap={1} alignItems="center">
              <Warning color="primary" sx={{ fontSize: 40 }} />
              <Typography color="muted">
                This action cannot be undone. All values associated with this
                field will be lost.
              </Typography>
            </Stack>
            <Stack mt={2}>
              <LoadingButton
                loading={isLoading}
                disabled={isLoading}
                onClick={() => onDelete(data)}
                variant="contained"
              >
                Delete
              </LoadingButton>
            </Stack>
          </Stack>
        }
      />
    )
  );
}
