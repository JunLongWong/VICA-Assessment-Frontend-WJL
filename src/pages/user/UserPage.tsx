import { MUIDataTableOptions } from "mui-datatables";
import DataTables from "../../components/dataTables";
import AppBarHeader from "../../components/header";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/Api/api";
import { useAppSelector } from "../../redux/store";
import { getAllUserList } from "../../redux/user/userSlice";
import CreateUpdateUserForm from '../../components/CreateUpdateUserForm'
import { UserRoleEnum } from "../../models/UserRoleEnum";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../hooks/useAuth";


const User = () => {
    const {
        isAuthorized
      } = useAuth();
    const { data, error, isLoading, isSuccess } = useGetAllUserQuery(null);
    const userList = useAppSelector(getAllUserList)
    const [deleteUser, { isError: isDeleteBookRejected, isSuccess: isDeleteBookSuccess }]
        = useDeleteUserMutation();

    const isSuperAdmin = (arrIndex: number) => {
        return userList[arrIndex].role === UserRoleEnum.SUPER_ADMIN;
    }

    const columns = ["Email", "Name", "Role", "Status", "Date_Joined"];
    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        customToolbar: () => { return (<CreateUpdateUserForm action="create" />) },
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            const selectedRowDataIndex = selectedRows.data[0].dataIndex;

            const arrIndexesForDeletion = selectedRows.data.map(obj => obj.dataIndex);

            return (
                <div>
                    {selectedRows.data.length === 1 && !isSuperAdmin(selectedRows.data[0].dataIndex) &&
                        <CreateUpdateUserForm action="update"
                            data={userList[selectedRowDataIndex]._id} />
                    }
                    {isAuthorized([UserRoleEnum.ADMIN]) && <Tooltip title="Delete">
                        <IconButton onClick={() => {
                            const arrIndexesForDeletion = selectedRows.data.map(obj => obj.dataIndex);
                            arrIndexesForDeletion.map(async (arrIndex) => {
                                if (isSuperAdmin(arrIndex)) {
                                    window.alert("You can\'t delete superadmin !");
                                    // disable delete icon 
                                    return false;
                                }

                                if (isSuccess && !isSuperAdmin(arrIndex)) {
                                    const rowId = userList[arrIndex]._id;
                                    await deleteUser(rowId);
                                }
                            });
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>}
                </div>
            );
        },
    }

    return (
        <div>
            <AppBarHeader headerName="ABC Book Users" />
            {isSuccess &&
                <DataTables
                    columnNameArray={columns}
                    dataTableTitle={"User"}
                    dataTableArrayfromStore={userList}
                    dataKeyToHide={"_id"}
                    options={options} />
            }
        </div>
    )
}

export default User;