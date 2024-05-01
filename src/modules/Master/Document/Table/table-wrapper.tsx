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
  useDeleteAllergyMutation,
} from "../../../../services/api/allergyApi";
import { useGetDocumentByUserIdQuery, useUpdateDocumentMutation, useUploadDocumentMutation } from "../../../../services/api/document";
import { useLocation } from "react-router-dom";

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

  const { state: { user: { id: userId } } } = useLocation()

  const { data: rows = [], isLoading } = useGetDocumentByUserIdQuery(userId);
  const [createMutation, { isLoading: createLoading }] =
    useUploadDocumentMutation();
  const [updateMutation, { isLoading: updateLoading }] =
    useUpdateDocumentMutation();
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
      const formData = new FormData()
      formData.append("document", values.document)
      formData.append("username", values.username)
      formData.append("feature", values.feature),
        formData.append("document_name", values.document_name),
        formData.append("type", values.type),
        createMutation(formData).then((res: any) => {
          if (res.data) {
            dispatch(closeModal());
            toast("success", messages.crud.success.create);
          } else if (res.error) {
            onError(res);
          }
        });
    } else if (modalState.type === "edit") {
      updateMutation({ id: values.id, formData: values }).then((res: any) => {
        if (res.data) {
          dispatch(closeModal());
          toast("success", messages.crud.success.update);
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
