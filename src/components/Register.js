import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Initialize as true
  const [fieldsNotEmpty, setFieldsNotEmpty] = useState(false);

  const routeChange = () => { 
    let path = `/`; 
    console.log("Email:", email);   //mettre ici l'envoie du mail
    console.log("Password:", password); //mettre ici l'envoie du password
    history.push(path);
  }

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check if passwords match
    setPasswordsMatch(newPassword === checkPassword);

    // Check if both email and password fields are not empty
    setFieldsNotEmpty(email.trim() !== '' && newPassword.trim() !== '' && checkPassword.trim() !== '');
  }

  const handleCheckPasswordChange = (event) => {
    const newCheckPassword = event.target.value;
    setCheckPassword(newCheckPassword);

    // Check if passwords match
    setPasswordsMatch(newCheckPassword === password);

    // Check if both email and password fields are not empty
    setFieldsNotEmpty(email.trim() !== '' && password.trim() !== '' && newCheckPassword.trim() !== '');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create your account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="checkPassword"
                label="Check Password"
                type="password"
                id="checkPassword"
                error={!passwordsMatch}
                helperText={!passwordsMatch && 'Passwords do not match'}
                autoComplete="current-password"
                onChange={handleCheckPasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={routeChange}
                disabled={!passwordsMatch || !fieldsNotEmpty}
              >
                Register
              </Button>
              </Grid>
              <Grid item xs={12}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={routeChange}
              >
                back
              </Button>
              </Grid>
            </Grid>
        </form>
      </div>
    </Container>
  );
}
