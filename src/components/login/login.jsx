import React, { useState } from 'react';
import Recaptcha from 'react-recaptcha';
import logo_src from '../../assets/img/blaash-logo.png';
import './login.css';
import Button from '@material-ui/core/Button';
import { BsArrowRepeat } from "react-icons/bs";
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
import { DUMM_TENANT_KEY, EMAIL, IDTY_PROD_HOST_URI, serverResponse, SOMETHING_WENT_WRONG, USER_DATA_GROUP_PERMISSIONS } from '../../api/apiConstants';
import { getAuthAndData } from '../../api/ApiHelper';
import createNotification from '../common/reactNotification';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';


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
    const [resetProcessing, setResetProcessing] = useState(false);
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
                    // console.log('***', user);
                    if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
                        setCognitoUser(user);
                        setNewUserSignIn({ ...newUserSignIn, email: logIn.email })
                        setForcePasswordChange(true);
                        setSignInProcessing(false);
                    } else {
                        var jwtToken = user.signInUserSession.accessToken.jwtToken;
                        props.loginActionHandler.dispatchJwtTokenData(jwtToken);
                        var tenantKey = user.attributes['custom:tenant_key'];
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
                        axiosInstance.defaults.headers.common['x-tenant-key'] = tenantKey || DUMM_TENANT_KEY;
                        localStorage.setItem(EMAIL, logIn.email);
                        getAuthAndData(`${IDTY_PROD_HOST_URI}${USER_DATA_GROUP_PERMISSIONS}${logIn.email}`)
                            .then(res => {
                                setSignInProcessing(false);
                                if (handleResponseCode(res)) {
                                    console.log('***',res.data);
                                    if(res.code===serverResponse.USER_EMAIL_NOT_FOUND){
                                        createNotification('warning','User details not found.')
                                        Auth.signOut();
                                    }else{
                                        props.loginActionHandler.dispatchUserData(res.data);
                                        if (!tenantKey) {
                                            axiosInstance.defaults.headers.common['x-tenant-key'] = res.data.TenantKey;
                                            axiosInstance.defaults.headers.common['x-uid'] = res.data.UserID;
                                            axiosInstance.defaults.headers.common['x-uname'] = res.data.FirstName+' '+res.data.LastName;
                                            Auth.currentAuthenticatedUser()
                                                .then(user => {
                                                    Auth.updateUserAttributes(user, {
                                                        'custom:tenant_key': res.data.TenantKey,
                                                    }).catch(err => console.error(err));
                                                }).catch(err => {
                                                    console.error(err);
                                                });
                                        }
                                        props.history.push('/dummy');
                                    }
                                }else{
                                    Auth.signOut();
                                }
                            });
                    }
                })
                .catch(err => {
                    // createNotification('error',err.message);
                    setSignInProcessing(false);
                    setError({ ...error, password: err.message })
                });
        }
        e.preventDefault();
    }
    const setNewUser = e => {
        if((e.target.name==='firstName'&&e.target.value.length<=30)||
            (e.target.name==='lastName'&&e.target.value.length<=30)||
            (e.target.name==='confirmPassword'&&e.target.value.length<=100)||
            (e.target.name==='email'&&e.target.value.length<=100)){
            setNewUserSignIn({ ...newUserSignIn, [e.target.name]: e.target.value })
            setError({ ...error, [e.target.name]: '' });
        } else{
            // setError({ ...error, [e.target.name]:'Maximum length reached' });
        }
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
        }else {
            setError({ ...error, newPassword: '' });
        }
        if(e.target.value.length<=100){
            setNewUserSignIn({ ...newUserSignIn, newPassword: e.target.value })
        }else{
            // setError({ ...error, newPassword: 'Password length must be lessthan or equal to 100' });
            // createNotification('info','Password length must be lessthan or equal to 100');
        }
    }
    const onResetPassword = e => {
        if (error.email || error.newPassword || error.confirmPassword) {
            console.error('error', error);
        } else if (newUserSignIn.newPassword !== newUserSignIn.confirmPassword) {
            setError({ ...error, confirmPassword: 'Confirm password is not matching with New password' });
        } else {
            setResetProcessing(true);
            // var postData={
            //     FirstName:newUserSignIn.firstName,
            //     MiddleName:'',
            //     LastName:newUserSignIn.lastName,
            //     Email:newUserSignIn.email,
            //     MobileNumber:'',
            //     Status:'PASSWORD_UPDATED'
            // }
    
            // postLoginAPIData(`${IDTY_PROD_HOST_URI}/idty/saveuser`,postData,props.history)
            // .then(res=>{
            //     // console.log('**', 'User Details are updated');
            // });
            updatePasswordInCognito();

        }
        e.preventDefault();
    }

    const updatePasswordInCognito=()=>{
        Auth.completeNewPassword(
            cognitoUser,
            newUserSignIn.newPassword,
            {
                'email': newUserSignIn.email,
            }
        ).then(user => {
            createNotification('success','Password changed succesfully')
            
            setForcePasswordChange(false);
            setCaptchaVerified(false);
            setResetProcessing(false);
        }).catch(err => {
            // console.error('*', err);
            setError({ ...error, confirmPassword: 'Unable to update password. Please try again' });
            setResetProcessing(false);
        });
    }

    const handleResponseCode=(resp)=>{
        if(!resp || resp.code===-1){
            createNotification('error',SOMETHING_WENT_WRONG +' in Login');
            return false;
        }else{
            return true;
        }
    }

    return (
        <div id="login-container" >
            <img src={logo_src} className='login-logo' />
            <NotificationContainer/>
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
                                            value={logIn.email}
                                            onChange={e => {
                                                if(e.target.value.length<=100){
                                                    setError({ ...error, email: '' });
                                                    setLogIn({ ...logIn, email: e.target.value });
                                                } else{
                                                    // setError({ ...error, password: 'Maximum Email length is reached' });
                                                }
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
                                            value={logIn.password}
                                            onChange={e => {
                                                if(e.target.value.length<=100){
                                                    setError({ ...error, password: '' });
                                                    setLogIn({ ...logIn, password: e.target.value })
                                                }else{
                                                    // setError({ ...error, password: 'Maximum Password length is reached' });
                                                }
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
                                            className={`${classes.submit} LoaderButton`}
                                            disabled={signInProcessing}
                                        >
                                            {signInProcessing && <BsArrowRepeat className="spinning" />}
                                            Sign In
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
                                        {/* <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            autoComplete="firstName"
                                            helperText={error.firstName}
                                            error={error.firstName}
                                            autoFocus
                                            value={newUserSignIn.firstName}
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
                                            helperText={error.lastName}
                                            error={error.lastName}
                                            value={newUserSignIn.lastName}
                                            onChange={setNewUser}
                                        /> */}
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
                                            disabled={newUserSignIn.email}
                                            value={newUserSignIn.email}
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
                                            value={newUserSignIn.newPassword}
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
                                            value={newUserSignIn.confirmPassword}
                                            onChange={setNewUser}
                                        />
                                        <Button 
                                            type="submit" 
                                            fullWidth 
                                            variant="contained" 
                                            color="primary" 
                                            className={classes.submit}
                                            disabled={resetProcessing}
                                        >Set Password
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
