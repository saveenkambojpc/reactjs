import { useGetRolesQuery } from "../../../services/api/roleApi";
import UserManagementView from "./user-management-view";

export default function UserManagementPage() {
    useGetRolesQuery();
    return (
        <div className="">
            <UserManagementView />
        </div>
    )
}