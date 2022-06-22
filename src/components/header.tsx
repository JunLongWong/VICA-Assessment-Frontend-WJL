import {
    Grid
} from '@material-ui/core';
import { Button, Stack, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

type Props = {
    headerName: string
}

const AppBarHeader: React.FC<Props> = ({ headerName }: Props) => {
    const {
        loggedUser,
        logout,
        getLoggedInUserRole,
    } = useAuth();

    const navigate = useNavigate()

    const handleDashboard = () => {
        navigate('/dashboard')
    }
    const handleUsers = () => {
        navigate('/user')
    }
    const handleBooks = () => {
        navigate('/index')
    }

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Grid>
                        <Button color="inherit" onClick={handleUsers}>
                            User
                        </Button>
                    </Grid>

                    <Grid>
                        <Button color="inherit" onClick={handleBooks}>
                            Book
                        </Button>
                    </Grid>
                    <Grid>
                        <Button color="inherit" onClick={handleDashboard}>
                            Dashboard
                        </Button>
                    </Grid>
                    <Grid container justifyContent="center" wrap="wrap">
                        <Grid item>
                            <Typography variant="h6">{headerName}</Typography>
                        </Grid>
                    </Grid>

                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="error" onClick={logout}>
                            Logout
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default AppBarHeader