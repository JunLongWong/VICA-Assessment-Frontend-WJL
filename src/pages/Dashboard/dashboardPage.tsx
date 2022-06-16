import {
    Button,
    TextField,
    Grid,
    Paper,
    AppBar,
    Typography,
    Toolbar,
    Link,
} from '@material-ui/core';
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

const Dashboard = () => {

    const data = [
        {
            name: "Book 1",
            uv: 4000,
        },
        {
            name: "Book 2",
            uv: 3000,
        },
        {
            name: "Book 3",
            uv: 2000,
        },
        {
            name: "Book 4",
            uv: 2780,
        },
        {
            name: "Book 5",
            uv: 1890,
        },

    ];
    const dataYearPublished = [{ year: 2012, qty: 3000 },
    { year: '2013', qty: 4000 },
    { year: '2014', qty: 5000 },
    { year: '2015', qty: 5000 },
    { year: '2016', qty: 5000 },
    { year: '2017', qty: 5000 },
    { year: '2018', qty: 5000 },
    { year: '2019', qty: 5000 },
    { year: '2020', qty: 5000 },
    { year: '2021', qty: 5000 },
    { year: '2022', qty: 5000 },
    { year: '2023', qty: 5000 },
    { year: '2024', qty: 5000 },
    { year: '2025', qty: 5000 },
    { year: '2026', qty: 5000 },
    { year: '2027', qty: 5000 },
    { year: '2014', qty: 5000 },
    { year: '2014', qty: 5000 },
    { year: '2014', qty: 5000 },
    { year: '2014', qty: 5000 },
    { year: '2014', qty: 5000 },
    { year: '2014', qty: 5000 }]
    return (
        <div>
            <AppBarHeader headerName='ABC Books Analytics Dashboard' />

            <BarChart style={{ padding: 2, margin: 80 }}
                width={1000}
                height={300}
                data={data}
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
                <Bar dataKey="uv" fill="#82ca9d">
                    <LabelList dataKey="name" position="top" />
                </Bar>
            </BarChart>

            <BarChart style={{ padding: 2, margin: 80 }}
                width={1200}
                height={300}
                data={dataYearPublished}
                margin={{
                    top: 25, right: 30, left: 20, bottom: 15
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" >
                    <Label value="Year Published" offset={-10} position='insideBottom' />
                </XAxis>

                <YAxis label={{ value: 'No. Of Books', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar dataKey="qty" fill="#82ca9d">
                    <LabelList dataKey="" position="top" />
                </Bar>
            </BarChart>
        </div>
    )
}

export default Dashboard;