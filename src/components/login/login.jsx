import React, { useState } from 'react';
import logo_src from '../../assets/img/blaash-logo.png';
import './login.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">blaash</Link>
            {' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
}));

export default function POC(props) {
    const classes = useStyles();
    const { REACT_APP_IAM_SECRET, REACT_APP_IAM_ACCESS_KEY, REACT_APP_AWS_REGION } = process.env;
    const [logIn, setLogIn] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('')
    const [newPasswordRequired, setNewPasswordRequired] = useState(false);
    const [newUserSignIn, setNewUserSignIn] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [cognitoUser, setCognitoUser] = useState();


    function registerOpenFn() {
        //props.history.push('/register');
    }

    const onSignIn = (e) => {
        if (validator.isEmail(logIn.email)) {
            Auth.signIn({ username: logIn.email, password: logIn.password })
                .then(user => {
                    console.log('*', user);
                    if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
                        setCognitoUser(user);
                        setNewPasswordRequired(true);
                    } else {
                        var jwtToken = user.signInUserSession.accessToken.jwtToken;
                        var refreshToken = user.signInUserSession.refreshToken.token;
                        localStorage.setItem('jwtToken', jwtToken);
                        localStorage.setItem('refreshToken', refreshToken);
                        window.location.href = '/';
                    }
                })
                .catch(err => {
                    console.log('**', err);
                    alert(err.message);
                });
        }
        e.preventDefault();
    }
    const setNewUser = e => {
        setNewUserSignIn({ ...newUserSignIn, [e.target.name]: e.target.value })
    }
    const onResetPassword = e => {
        if (newUserSignIn.newPassword !== newUserSignIn.confirmPassword) {
            alert('Confirm password is not matching with New password.');
        } else {
            Auth.completeNewPassword(
                cognitoUser,
                newUserSignIn.newPassword,
                {
                    'email': newUserSignIn.email
                }
            ).then(user => {
                // at this time the user is logged in if no MFA required
                console.log('***', user);
                setNewPasswordRequired(false);
            }).catch(err => {
                console.error('*', err);
                alert(err.message)
            });
        }
        e.preventDefault();
    }

    return (
        <div id="login-container" >
            <img src={logo_src} className='login-logo' />
            {
                !newPasswordRequired ?
                    <div className='login-outer-container'>
                        <div className='login-container' containerHeightCalcFn={0}>
                            <Container component="main" maxWidth="xs">
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">Login to Your Account</Typography>
                                    <form className={classes.form} validator onSubmit={onSignIn}>
                                        <TextField
                                            id="email"
                                            label="Email"
                                            name="email"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="email"
                                            autoFocus
                                            onChange={e => setLogIn({ ...logIn, email: e.target.value })}
                                        />
                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Password"
                                            name="password"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            onChange={e => setLogIn({ ...logIn, password: e.target.value })}
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" variant="body2">Forgot password?</Link>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </Container>
                        </div>
                    </div>
                    :
                    <div className='reset-password-outer-container'>
                        <div className='reset-password-container' containerHeightCalcFn={0}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">Reset Password on First Login </Typography>
                                    <form className={classes.form} validator onSubmit={onResetPassword}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            autoComplete="firstName"
                                            autoFocus
                                            onChange={setNewUser}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lastName"
                                            autoFocus
                                            onChange={setNewUser}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={setNewUser}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="newPassword"
                                            label="New Password"
                                            type="password"
                                            id="newPassword"
                                            autoComplete="current-password"
                                            onChange={setNewUser}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            autoComplete="current-password"
                                            onChange={setNewUser}
                                        />
                                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                            Reset Password
                                        </Button>
                                    </form>
                                </div>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </Container>
                        </div>
                    </div>
            }
        </div>
    )
}
