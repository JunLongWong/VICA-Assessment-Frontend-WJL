import DataTables from "../../components/dataTables";
import AppBarHeader from "../../components/header";
import { useGetAllUserQuery } from "../../redux/Api/api";

const User = () => {
    const { data, error, isLoading, isSuccess } = useGetAllUserQuery(null);
    const columns = ["Email", "Name", "Role", "Status", "Date_Joined"];
    return (
        <div>
            <AppBarHeader headerName="ABC Book Users" />
            {isSuccess && <DataTables
                dataTableArray={data.users.user}
                columnNameArray={columns}
                dataTableTitle={"Users"}
                dataKeyToHide={"_id"} />}
        </div>
    )
}

export default User;