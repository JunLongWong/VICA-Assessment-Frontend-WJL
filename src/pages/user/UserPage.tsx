import DataTables from "../../components/dataTables";
import AppBarHeader from "../../components/header";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/Api/api";
import { useAppSelector } from "../../redux/store";
import { getAllUserList } from "../../redux/user/userSlice";

const User = () => {
    const { data, error, isLoading, isSuccess } = useGetAllUserQuery(null);
    const userList = useAppSelector(getAllUserList)
    const [deleteUser, { isError: isDeleteBookRejected, isSuccess: isDeleteBookSuccess }]
        = useDeleteUserMutation();

    const columns = ["Email", "Name", "Role", "Status", "Date_Joined"];
    return (
        <div>
            <AppBarHeader headerName="ABC Book Users" />
            {isSuccess &&
                <DataTables
                    columnNameArray={columns}
                    dataTableTitle={"Users"}
                    getDataApiSuccess={isSuccess}
                    dataTableArrayfromStore={userList}
                    dataKeyToHide={"_id"}
                    deleteDataApi={deleteUser} />
            }
        </div>
    )
}

export default User;