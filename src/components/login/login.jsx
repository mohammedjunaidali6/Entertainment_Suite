import React, { useState } from 'react';
import Recaptcha from 'react-recaptcha';
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
import { Auth } from 'aws-amplify';
import { axiosInstance } from '../../api/axios-config';
import { EMAIL, JWT_TOKEN, REFRESH_TOKEN } from '../../api/apiConstants';


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

export default function LogIn(props) {
    const classes = useStyles();
    const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env;
    const [logIn, setLogIn] = useState({ email: '', password: '' });
    const [error, setError] = useState('')
    const [signInProcessing, setSignInProcessing] = useState(false);
    const [forcePasswordChange, setForcePasswordChange] = useState(false);
    const [newUserSignIn, setNewUserSignIn] = useState({
        firstName: '',
        lastName: '',
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [cognitoUser, setCognitoUser] = useState();
    const [captchaVerified, setCaptchaVerified] = useState(false);
    let recaptchaInstance;

    const onVerifyCaptcha = response => {
        if (response) {
            setCaptchaVerified(true);
        } else {
            setCaptchaVerified(false);
        }
    }
    const onExpireCaptcha = () => {
        recaptchaInstance.reset();
    }

    const onSignIn = (e) => {
        if (!validator.isEmail(logIn.email)) {
            setError({ ...error, email: 'Please enter a valid email' })
        } else if (!logIn.password) {
            setError({ ...error, password: 'Please enter password' })
        } else {
            setSignInProcessing(true);
            Auth.signIn({ username: logIn.email, password: logIn.password })
                .then(user => {
                    console.log('*', user);
                    if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
                        setCognitoUser(user);
                        setForcePasswordChange(true);
                    } else {
                        var jwtToken = user.signInUserSession.accessToken.jwtToken;
                        var refreshToken = user.signInUserSession.refreshToken.token;
                        var tenantKey = user.attributes['custom:tenant_key'];
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
                        axiosInstance.defaults.headers.common['tenant_key'] = tenantKey;
                        localStorage.setItem(EMAIL, logIn.email);
                        sessionStorage.setItem(JWT_TOKEN, jwtToken);
                        sessionStorage.setItem(REFRESH_TOKEN, refreshToken);

                        props.history.push('/loading');
                    }
                    setSignInProcessing(false);
                })
                .catch(err => {
                    setSignInProcessing(false);
                    setError({ ...error, password: err.message })
                });
        }
        e.preventDefault();
    }
    const setNewUser = e => {
        setNewUserSignIn({ ...newUserSignIn, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: e.target.value });
    }
    const onChangeNewPassword = (e) => {
        if (!new RegExp("^(?=.{8,})").test(e.target.value)) {
            setError({ ...error, newPassword: 'Password should be atleast 8 characters length' });
        } else if (!new RegExp("^(?=.*[a-z])").test(e.target.value)) {
            setError({ ...error, newPassword: 'Password should contain atleast 1 lowerCase alphabet' });
        } else if (!new RegExp("^(?=.*[A-Z])").test(e.target.value)) {
            setError({ ...error, newPassword: 'Password should contain atleast 1 upperCase alphabet' });
        } else if (!new RegExp("^(?=.*[0-9])").test(e.target.value)) {
            setError({ ...error, newPassword: 'Password should contain atleast 1 number' });
        } else if (!new RegExp("^(?=.*[!@#\$%\^&\*])").test(e.target.value)) {
            setError({ ...error, newPassword: 'Password should contain atleast 1 special character' });
        } else {
            setError({ ...error, newPassword: '' });
            setNewUserSignIn({ ...newUserSignIn, newPassword: e.target.value })
        }
    }
    const onResetPassword = e => {
        if (!error.email || !error.newPassword || !error.confirmPassword) {
            console.error('error', error);
        } else if (newUserSignIn.newPassword !== newUserSignIn.confirmPassword) {
            setError({ ...error, confirmPassword: 'Confirm password is not matching with New password' });
        } else {
            Auth.completeNewPassword(
                cognitoUser,
                newUserSignIn.newPassword,
                {
                    'email': newUserSignIn.email
                }
            ).then(user => {
                setForcePasswordChange(false);
                setCaptchaVerified(false);
            }).catch(err => {
                console.error('*', err);
                setError({ ...error, confirmPassword: err.message });
            });
        }
        e.preventDefault();
    }

    return (
        <div id="login-container" >
            <img src={logo_src} className='login-logo' />
            {
                !forcePasswordChange ?
                    <div className='login-outer-container'>
                        <div className='login-container' containerHeightCalcFn={0}>
                            <Container component="main" maxWidth="xs">
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">Login to Your Account</Typography>
                                    <form className={classes.form} noValidate onSubmit={onSignIn}>
                                        <TextField
                                            id='email'
                                            label="Email"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoComplete="email"
                                            autoFocus
                                            error={error.email}
                                            helperText={error.email}
                                            onChange={e => {
                                                setError({ ...error, email: '' });
                                                setLogIn({ ...logIn, email: e.target.value });
                                            }}
                                        />
                                        <TextField
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            error={error.password}
                                            helperText={error.password}
                                            onChange={e => {
                                                setError({ ...error, password: '' });
                                                setLogIn({ ...logIn, password: e.target.value })
                                            }}
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
                                            disabled={signInProcessing}
                                        >Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/forgotPassword" variant="body2">
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </form>

                                </div>
                                <Recaptcha
                                    ref={e => recaptchaInstance = e}
                                    sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
                                    render="explicit"
                                    verifyCallback={onVerifyCaptcha}
                                    expiredCallback={onExpireCaptcha}
                                />
                                <Box mt={5}><Copyright /></Box>
                            </Container>

                        </div>
                    </div>
                    :
                    <div className='reset-password-outer-container'>
                        <div className='reset-password-container' containerHeightCalcFn={0}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper}>
                                    <Typography component="h1" variant="h5">Set Password on First Login </Typography>
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
                                            error={error.email}
                                            helperText={error.email}
                                            onChange={setNewUser}
                                        />
                                        <TextField
                                            type="password"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="New Password"
                                            error={error.newPassword}
                                            helperText={error.newPassword}
                                            onChange={onChangeNewPassword}
                                        />
                                        <TextField
                                            type="password"
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Confirm Password"
                                            name='confirmPassword'
                                            error={error.confirmPassword}
                                            helperText={error.confirmPassword}
                                            onChange={setNewUser}
                                        />
                                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                            Set Password
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
