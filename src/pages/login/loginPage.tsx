import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import useStyles from './loginPageStyles';
import AppBarHeader from "../../components/header";

const LoginPage: React.FC = () => {
  const classes = useStyles()

  const {
    tryLogin: { login, isLoginRejected }
  } = useAuth();

  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await login({ email: email, password: password })
  }

  return (
    <div>
      <AppBarHeader headerName="ABC Book Store" />
      <Grid container spacing={0} justifyContent="center" direction="row" className={classes.loginContainer}>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            spacing={2}
            className={classes.loginForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.loginBackground}
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="email"
                        variant="outlined"
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={(event) =>
                          setPassWord(event.target.value)
                        }
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.buttonBlock}
                      >
                        Submit
                      </Button>
                      {isLoginRejected && <Typography className={classes.loginError}
                        variant="caption" display="block" gutterBottom
                      >Login Error ! Please check your credentials !</Typography>}
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default LoginPage;
