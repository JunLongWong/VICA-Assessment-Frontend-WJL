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
import { dataTransform } from '../../utils/DashboardDataTransform';

const Dashboard = () => {
    const booklist = useAppSelector(getAllBookList);

    const genreArrDuplicate = booklist.map(book => book.genre)
    const genreArrCounter = dataTransform(booklist, genreArrDuplicate)
    const genreArr = []
    for (let key in genreArrCounter) {
        genreArr.push({ name: key, Quantity: genreArrCounter[key] })
    }

    const yearArrDuplicate = booklist.map(book => book.published_year)
    const yearArrCounter = dataTransform(booklist, yearArrDuplicate)
    const yearArr = []
    for (let key in yearArrCounter) {
        yearArr.push({ name: key, Quantity: yearArrCounter[key] })
    }

    return (
        <div>
            <AppBarHeader headerName='ABC Books Analytics Dashboard' />
            <BarChart style={{ padding: 2, margin: 80 }}
                width={1000}
                height={300}
                data={genreArr}
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
                data={yearArr}
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