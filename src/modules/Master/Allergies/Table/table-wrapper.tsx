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
import { AddIcon } from "../../../../components/icons/icons";
import {
  useCreateAllergyMutation,
  useDeleteAllergyMutation,
  useGetAllergiesQuery,
  useUpdateAllergyMutation,
} from "../../../../services/api/allergyApi";

interface TableWrapperProps {
  tableName: string;
  filterByUserId?: string;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableName,
  filterByUserId = "",
}) => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectModalState);

  const { data: rows = [], isLoading } = useGetAllergiesQuery();
  const [createMutation, { isLoading: createLoading }] =
    useCreateAllergyMutation();
  const [updateMutation, { isLoading: updateLoading }] =
    useUpdateAllergyMutation();
  const [deleteMutation, { isLoading: deleteLoading }] =
    useDeleteAllergyMutation();

  const handleOpenModalForAdd = () => {
    dispatch(openModal({ type: "add" }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  function onError(res: any) {
    if (res.error.status === 409) {
      toast("error", res?.error?.data?.detail?.message);
    } else {
      toast("error", messages.crud.error);
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
        if (res) {
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

  return (
    <Box>
      <TableTitleWrapper tableName={tableName}>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleOpenModalForAdd}
        >
          Add {tableName}
        </Button>
      </TableTitleWrapper>

      {modalState.visible && ["add", "edit"].includes(modalState.type) && (
        <Modal
          title={`${modalState.type === "add" ? "New " : "Edit "}${tableName}`}
          open={modalState.visible}
          handleClose={handleCloseModal}
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

      <Table rows={rows} filterByUserId={filterByUserId} />
    </Box>
  );
};

export default TableWrapper;
