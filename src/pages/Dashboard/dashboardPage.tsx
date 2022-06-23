import AppBarHeader from '../../components/header';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    LabelList,
} from "recharts";
import { useAppSelector } from '../../redux/store';
import { getAllBookList } from '../../redux/books/bookSlice';
import { useGetAllBookQuery } from '../../redux/Api/api';

type dataArray = {
    name: string,
    Quantity: number
}

// Extremly bad & trashy practice, should have create backend api to filter values
// however, due to time constraint, have decide to proceed to wrangle values on the frontend.
const Dashboard: React.FC = () => {
    const { data, error, isLoading, isSuccess } = useGetAllBookQuery(null);
    const booklist = useAppSelector(getAllBookList);
  
    // filter by genre
    const genreCounter: any = {}
    const genreDataArray: any[] = []
    booklist.forEach((obj) => {
        if (obj.genre in genreCounter) { genreCounter[obj.genre] += obj.quantity }
        else { genreCounter[obj.genre] = obj.quantity }
    })

    for (const keys in genreCounter) {
        genreDataArray.push({ name: keys, Quantity: genreCounter[keys] })
    }

    // filter by year published
    const yearCounter: any = {}
    const yearDataArray: dataArray[] = []
    booklist.forEach((obj) => {
        if (obj.published_year in yearCounter) { yearCounter[obj.published_year] += obj.quantity }
        else { yearCounter[obj.published_year] = obj.quantity }
    })

    for (const keys in yearCounter) {
        yearDataArray.push({ name: keys, Quantity: yearCounter[keys] })
    }

    return (
        <div>
            <AppBarHeader headerName='ABC Books Analytics Dashboard' />
            <BarChart style={{ padding: 2, margin: 80 }}
                width={1000}
                height={300}
                data={genreDataArray}
                margin={{
                    top: 25, right: 30, left: 20, bottom: 15
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" >
                    <Label value="Genre" offset={-10} position='insideBottom' />
                </XAxis>

                <YAxis label={{ value: 'No. Of Books', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="Quantity" fill="#82ca9d">
                    <LabelList dataKey="" position="top" />
                </Bar>
            </BarChart>

            <BarChart style={{ padding: 2, margin: 80 }}
                width={1200}
                height={300}
                data={yearDataArray}
                margin={{
                    top: 25, right: 30, left: 20, bottom: 15
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" >
                    <Label value="Year Published" offset={-10} position='insideBottom' />
                </XAxis>
                <YAxis label={{ value: 'No. Of Books', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="Quantity" fill="#82ca9d">
                    <LabelList dataKey="" position="top" />
                </Bar>
            </BarChart>
        </div>
    )
}

export default Dashboard;