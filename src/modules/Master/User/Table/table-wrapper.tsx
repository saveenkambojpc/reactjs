import { Box } from "@mui/material";
import { Table } from ".";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  closeModal,
  openModal,
  selectModalState,
} from "../../../../store/features/modalSlice";
import Modal from "../../../../components/core-ui/modal/modal";
import ModalContent from "./modal-content";
import DeleteWarningModal from "../../../../components/modal/delete-warning-modal";
import { Button } from "../../../../components/core-ui/button";
import { Backdrop } from "../../../../components/core-ui/backdrop";
import { messages } from "../../../../constants/messages";
import { toast } from "../../../../services/toast";
import { TableTitleWrapper } from "../../../../components/core-ui/table";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../../../services/api/userApi";
import { AddIcon } from "../../../../components/icons/icons";

interface TableWrapperProps {
  tableName: string;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ tableName }) => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectModalState);

  const { data: rows = [], isLoading } = useGetUsersQuery();
  const [deleteMutation, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const [createMutation, { isLoading: createLoading }] = useCreateUserMutation();
  const [updateMutation, { isLoading: updateLoading }] = useUpdateUserMutation();

  const handleOpenModalForAdd = () => {
    dispatch(openModal({ type: "add" }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  function onError(res: any) {
    if (res.error.status === 409) {
      toast("error", res?.error?.data?.detail?.message);
    }
  }

  const handleAddUpdate = (values: any) => {
    if (modalState.type === "add") {
      createMutation(values).then((res: any) => {
        if (res.data) {
          dispatch(closeModal());
          toast("success", messages.crud.success.create);
        } else if (res.error) {
          onError(res);
        }
      });
    } else if (modalState.type === "edit") {
      updateMutation(values).then((res: any) => {
        if (res.data) {
          dispatch(closeModal());
          toast("success", messages.crud.success.update);
        } else if (res.error) {
          onError(res);
        }
      });
    }
  };

  const handleDelete = (data: any) => {
    deleteMutation(data.id).then((res: any) => {
      if (res.data) {
        handleCloseModal();
      } else {
        toast("error", messages.crud.error);
      }
    });
  };

  const handleMultiDelete = (selected: string[]) => {
    const deletePromises = selected.map(id => deleteMutation(id));

    Promise.all(deletePromises)
      .then((responses: any[]) => {
        const isSuccess = responses.every(res => res.data);
        if (isSuccess) {
          handleCloseModal();
        } else {
          toast("error", messages.crud.error);
        }
      })
      .catch(_error => {
        toast("error", "An error occurred while deleting. Please try again later.");
      });
  };


  return (
    <Box>
      <TableTitleWrapper tableName={tableName}>
        <Button startIcon={<AddIcon />} variant="contained" onClick={handleOpenModalForAdd}>
          Add {tableName}
        </Button>
      </TableTitleWrapper>

      {modalState.visible && ["add", "edit"].includes(modalState.type) && (
        <Modal
          title={`${modalState.type === "add" ? "New " : "Edit "}${tableName}`}
          open={modalState.visible}
          handleClose={handleCloseModal}
          maxWidth={modalState.type === "add" ? "md" : "lg"}
          content={
            <ModalContent
              handleAddUpdate={handleAddUpdate}
              isLoading={createLoading || updateLoading}
            />
          }
        />
      )}

      <Backdrop open={isLoading} />

      <DeleteWarningModal isLoading={deleteLoading} onDelete={handleDelete} />
      <Table rows={rows} />
    </Box>
  );
};

export default TableWrapper;
