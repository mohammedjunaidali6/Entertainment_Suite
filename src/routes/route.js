import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import NotFound from '../components/common/notFound';
import { ThemeProvider } from '../contexts/themeContext';
import Home from '../components/home/home';
import DashboardContatiner from '../containers/dashboard/dashboardContainer';
import HeaderContainer from '../containers/header/headerContainer';
import SettingsContatiner from "../containers/settings/settingsContainer";
import ManageContatiner from "../containers/manage/manageContainer";
import EngagementsContatiner from "../containers/engagements/engagementsContainer";
import LiveViewContatiner from "../containers/liveView/liveViewContainer";
import AnalyticsContatiner from "../containers/analytics/analyticsContainer";
import SegmentsContatiner from "../containers/segments/segmentsContainer";
import AdminContatiner from "../containers/admin/adminContainer";
import LoginContatiner from "../containers/login/loginContainer";
import RegisterContatiner from "../containers/register/registerContainer";
import VerifyContatiner from "../containers/verify/verifyContainer";
import POCContainer from '../containers/poc/pocContainer';
import AlertDialog from '../components/common/alertBox/dialogBox';
import Loader from '../components/common/Spinner/spinner';
import Loading from '../components/loading/loading';
import ForgotPassword from '../components/login/forgotPassword';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);


export default function AppRoute(props) {
  console.log('**', props)
  const [userAuthenticated, setUserAuthentcated] = useState(false);
  const currentRoute = window.location.href;

  useMemo(() => {
    if (!currentRoute.endsWith('/login') && !currentRoute.endsWith('/forgotPassword')) {
      //Verifying User is logged in or not.
      Auth.currentAuthenticatedUser({ bypassCache: false })
        .then((userData) => setUserAuthentcated(true))
        .catch((err) => {
          setUserAuthentcated(false);
          alert(`${err} Please SignIn`);
          window.location.href = '/login';
        });
    }
  });

  return (
    <ThemeProvider>
      {(userAuthenticated || currentRoute.endsWith('/login') || currentRoute.endsWith('/forgotPassword')) &&
        <div id="app-route-container">
          <BrowserRouter>
            {(!currentRoute.endsWith('/') &&
              !currentRoute.endsWith('/loading') &&
              !currentRoute.endsWith('/login') &&
              !currentRoute.endsWith('/forgotPassword') &&
              !currentRoute.endsWith('/register') &&
              !currentRoute.endsWith('/verify'))
              ? <HeaderContainer /> : null
            }
            <Home>
              <Loader show={props.showLoader} />
              <AlertDialog
                open={props.alertDialog.open}
                title={props.alertDialog.title}
                text={props.alertDialog.text}
                handleClose={(bool) => props.alertDialog.handleClose(bool)}
              />
              <Switch>
                <Route exact path="/login" component={LoginContatiner} />
                <Route exact path="/loading" component={Loading} />
                <Route exact path="/forgotPassword" component={ForgotPassword} />
                <Route exact path="/dashboard" component={DashboardContatiner} />
                <Route exact path="/engagements/:tabname" component={EngagementsContatiner} />
                <Route exact path="/liveview" component={LiveViewContatiner} />
                <Route exact path="/analytics/:tabname" component={AnalyticsContatiner} />
                <Route exact path="/manage/:tabname" component={ManageContatiner} />
                <Route exact path="/segments" component={SegmentsContatiner} />
                <Route exact path="/admin" component={AdminContatiner} />
                <Route exact path="/settings" component={SettingsContatiner} />
                <Route exact path="/register" component={RegisterContatiner} />
                <Route exact path="/verify" component={VerifyContatiner} />
                <Route exact path="/poc" component={POCContainer} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Home>
          </BrowserRouter>
        </div>
      }
    </ThemeProvider>
  );
}
