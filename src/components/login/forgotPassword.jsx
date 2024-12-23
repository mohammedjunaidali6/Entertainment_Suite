import React, { useState } from 'react';
import Recaptcha from 'react-recaptcha';
import logo_src from '../../assets/img/blaash-logo.png';
import './login.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'validator';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { useEffect } from 'react';
import createNotification from '../common/reactNotification';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import { BsArrowRepeat } from 'react-icons/bs';
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

export default function ForgotPassword(props) {
  const classes = useStyles();
  const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env;
  const [forgotPassword, setPassword] = useState({ email: '', code: '', newPassword: '', confirmPassword: '' });
  const [processing, setProcessing] = useState(false);
  const [enableVerification, setEnableVerification] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [error, setError] = useState('')
  let recaptchaInstance;

  const onVerifyCaptcha = response => {
    if (response) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  }
  const onExpireCaptcha = () => {
    // console.log('**', recaptchaInstance)
    recaptchaInstance.reset();
    createNotification('info','Recaptcha expired')
  }
  const onSendVerificationCode = () => {
    // Send confirmation code to user's email
    if (validator.isEmail(forgotPassword.email)) {
      setProcessing(true);
      Auth.forgotPassword(forgotPassword.email)
        .then(data => {
          setEnableVerification(true);
          createNotification('info','You will receive a Code if you are a registered user.')
          setProcessing(false);
        })
        .catch(err => {
          console.log('**', err)
          createNotification('error',err.message)
          setProcessing(false);
        });
    } else {
      setError({ ...error, email: 'Email is not valid. Enter a valid email' })
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
    } else {
      setError({ ...error, newPassword: '' });
    }
    if(e.target.value.length<=100){
      setPassword({ ...forgotPassword, newPassword: e.target.value })
    }
  }
  const onResetPassword = e => {
    if (forgotPassword.newPassword !== forgotPassword.confirmPassword) {
      setError({ ...error, confirmPassword: 'Confirm password is not matching with New password.' });
    } else {
      // Collect confirmation code and new password, then
      setProcessing(true);
      Auth.forgotPasswordSubmit(forgotPassword.email, forgotPassword.code, forgotPassword.newPassword)
        .then(data => {
          createNotification('success','Password is changed succesfully')
          setTimeout(()=>{
            props.history.push('/login');
            setProcessing(false);
          },5000)
        })
        .catch(err => {
          createNotification('error',err.message)
          setProcessing(false);
        });
    }
    e.preventDefault();
  }

  useEffect(() => {
    return () => {
      setPassword({ email: '', code: '', newPassword: '', confirmPassword: '' });
      setEnableVerification(false);
      setCaptchaVerified(false);
    }
  }, [])

  return (
    <div id="login-container" >
      <img src={logo_src} className='login-logo' />
      <NotificationContainer/>
      <div className='forgot-password-outer-container'>
        <div className='reset-password-container' containerHeightCalcFn={0}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">Reset Password</Typography>
              <form className={classes.form} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  autoFocus
                  error={error.email}
                  helperText={error.email}
                  disabled={enableVerification}
                  value={forgotPassword.email}
                  onChange={e => {
                    if(e.target.value.length<=100){
                      setPassword({ ...forgotPassword, email: e.target.value });
                      setError({ ...error, email: '' });
                    }
                  }}
                />
                {!enableVerification ?
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={`${classes.submit} LoaderButton`}
                    onClick={onSendVerificationCode}
                    disabled={processing}
                  >
                    {processing && <BsArrowRepeat className="spinning" />}
                    Send Verification Code
                  </Button>
                  :
                  <>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Verification Code"
                      autoComplete="verificationCode"
                      autoFocus
                      onChange={e => setPassword({ ...forgotPassword, code: e.target.value })}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="New Password"
                      type="password"
                      autoComplete="current-password"
                      error={error.newPassword}
                      helperText={error.newPassword}
                      value={forgotPassword.newPassword}
                      onChange={onChangeNewPassword}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      autoComplete="current-password"
                      error={error.confirmPassword}
                      helperText={error.confirmPassword}
                      value={forgotPassword.confirmPassword}
                      onChange={e => {
                        if(e.target.value.length<=100){
                          setPassword({ ...forgotPassword, confirmPassword: e.target.value });
                          setError({ ...error, confirmPassword: '' })
                        }
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={`${classes.submit} LoaderButton`}
                      onClick={onResetPassword}
                      disabled={processing}
                    >
                      {processing && <BsArrowRepeat className="spinning" />}
                      Reset Password
                    </Button>
                  </>
                }
              </form>
            </div>
            <Recaptcha
              ref={e => recaptchaInstance = e}
              sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
              render="explicit"
              verifyCallback={onVerifyCaptcha}
              expiredCallback={onExpireCaptcha}
            />
            <Link href='/login' style={{ fontSize: '10px' }}>&larr; SignIn</Link>
            <Box mt={5}><Copyright /></Box>
          </Container>
        </div>
      </div>
    </div>
  )
}