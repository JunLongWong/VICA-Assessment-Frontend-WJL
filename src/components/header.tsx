import {
    Grid,
    AppBar,
    Typography,
    Toolbar,
} from '@material-ui/core';

type Props = {
    headerName: string
}

const AppBarHeader: React.FC<Props> = ({ headerName }: Props) => {
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Grid container justifyContent="center" wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">{headerName}</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppBarHeader