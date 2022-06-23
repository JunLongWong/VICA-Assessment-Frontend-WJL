import AppBarHeader from '../../components/header';
import { useGetAllBookQuery, useDeleteBookMutation } from '../../redux/Api/api';
import { MUIDataTableOptions } from "mui-datatables";
import DataTables from '../../components/dataTables';
import { useNavigate } from "react-router-dom";
import {
    getAllBookList
} from '../../redux/books/bookSlice'
import { useAppSelector } from '../../redux/store';
import CreateUpdateBookForm from '../../components/CreateUpdateBookForm';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../hooks/useAuth';
import { UserRoleEnum } from '../../models/UserRoleEnum';


const Index = () => {
    const {
        isAuthorized
    } = useAuth();

    const navigate = useNavigate();

    const columns = ["Title", "Description", "Genre", "Author",
        "Published Year", "Quantity", "Availability"];

    const { data, error, isLoading, isSuccess } = useGetAllBookQuery(null);
    const [deleteBook, { isError: isDeleteBookRejected, isSuccess: isDeleteBookSuccess }]
        = useDeleteBookMutation();

    const booklist = useAppSelector(getAllBookList);

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
        customToolbar: () => { return (<CreateUpdateBookForm action="create" />) },
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            const selectedRowDataIndex = selectedRows.data[0].dataIndex;
            const arrIndexesForDeletion = selectedRows.data.map(obj => obj.dataIndex);

            return (<>
                {isAuthorized([UserRoleEnum.ADMIN, UserRoleEnum.EDITOR]) && <div>
                    {selectedRows.data.length === 1 &&
                        <CreateUpdateBookForm action="update"
                            data={booklist[selectedRowDataIndex]._id} />
                    }
                    {<Tooltip title="Delete">
                        <IconButton onClick={() => {
                            const arrIndexesForDeletion = selectedRows.data.map(obj => obj.dataIndex);
                            arrIndexesForDeletion.map(async (arrIndex) => {
                                if (isSuccess) {
                                    const rowId = booklist[arrIndex]._id;
                                    await deleteBook(rowId);
                                }
                            });
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>}
                </div>}</>
            );
        },
    }

    return (
        <div>
            <AppBarHeader headerName='ABC Book' />

            {isSuccess &&
                <DataTables
                    columnNameArray={columns}
                    dataTableTitle={"Book"}
                    dataTableArrayfromStore={booklist}
                    dataKeyToHide={"_id"}
                    options={options} />
            }

        </div>
    )
}

export default Index