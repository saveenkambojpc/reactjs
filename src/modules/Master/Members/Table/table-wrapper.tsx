import { Box } from "@mui/material";
import { Table } from ".";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
    closeModal,
    openModal,
    selectModalState,
} from "../../../../store/features/modalSlice";
import Modal from "../../../../components/core-ui/modal/modal";
import ModalContent from "./fragments/modal-content";
// import DeleteWarningModal from "../../../../components/modal/delete-warning-modal";
import { Button } from "../../../../components/core-ui/button";
import { Backdrop } from "../../../../components/core-ui/backdrop";
import { messages } from "../../../../constants/messages";
import { toast } from "../../../../services/toast";
import { TableTitleWrapper } from "../../../../components/core-ui/table";
import { AddIcon } from "../../../../components/icons/icons";
import {
    useCreateMemberMutation,
    // useDeleteMemberMutation,
    useGetMembersQuery,
    useUpdateMemberMutation
} from "../../../../services/api/member";
import { useGetUsersQuery } from "../../../../services/api/userApi";

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


    const { data: rows = [], isLoading } = useGetMembersQuery();

    const [createMutation, { isLoading: createLoading }] =
        useCreateMemberMutation();
    const [updateMutation, { isLoading: updateLoading }] =
        useUpdateMemberMutation();

    // const [deleteMutation, { isLoading: deleteLoading }] =
    //     useDeleteMemberMutation();

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
        const featuresStructure = values.features?.reduce((acc: any, curr: any) => {
            const makers = curr.makers.map((obj: any) => {
                return { id: obj.id, username: 'string', active: true }
            })
            const checkers = curr.checkers.map((obj: any) => {
                return { id: obj.id, username: 'string', active: true }
            })
            acc.push({ ...curr, makers: makers, checkers: checkers })
            return acc;
        }, [])

        values.features = featuresStructure ?? [];
        values.member_admin_id = values.member_admin_id.reduce((acc: any, curr: any) => {
            acc.push(curr.id);
            return acc;
        }, []);

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
            console.log(values, 'vallues inside edit')
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

    // const handleDelete = (data: any) => {
    // const { id } = data
    // deleteMutation({ id, member_id }).then((res: any) => {
    //     if (res.data) {
    //         handleCloseModal();
    //     } else {
    //         toast("error", messages.crud.error);
    //     }
    // });
    // };

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
                    maxWidth={modalState.type === "add" ? "md" : "lg"}
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

            {/* <DeleteWarningModal isLoading={deleteLoading} onDelete={handleDelete} /> */}

            <Table rows={rows} filterByUserId={filterByUserId} />
        </Box>
    );
};

export default TableWrapper;
