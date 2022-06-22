import MUIDataTable from "mui-datatables";
import useStyles from '../pages/login/loginPageStyles';

type Props = {
    columnNameArray: string[] | any,
    dataTableTitle: string,
    dataTableArrayfromStore: Array<any>
    dataKeyToHide?: string | number,
    options: any
}

const DataTables = ({
    columnNameArray,
    dataTableTitle,
    dataTableArrayfromStore,
    dataKeyToHide,
    options
}: Props) => {
    const classes = useStyles()
    const datatableRecords: (object | string[] | number[])[] = dataTableArrayfromStore.map((object) => {
        const newArr = [];
        for (const [key, val] of Object.entries(object)) {
            if (key === dataKeyToHide) {
                continue;
            }
            newArr.push(val)
        }
        return newArr;
    })

    return (
        <div>
            <MUIDataTable
                title={dataTableTitle}
                data={datatableRecords}
                columns={columnNameArray}
                options={options}
            />
        </div>
    )
}


export default DataTables