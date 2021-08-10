import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import NotFound from '../components/common/notFound';
import { ThemeProvider } from '../contexts/themeContext';
import Home from '../components/home/home';
import DashboardContatiner from '../containers/dashboard/dashboardContainer';
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
import dummy from '../components/loading/dummy';
import ForgotPassword from '../components/login/forgotPassword';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import ProtectedRoute from '../components/protectedRoute';
import LoadingContatiner from '../components/loading/loadingContainer';
Amplify.configure(awsconfig);


export default function AppRoute(props) {

  return (
    <ThemeProvider>
      <div id="app-route-container">
        <BrowserRouter>
          <Home>
            <Loader show={props.showLoader} />
            <AlertDialog
              open={props.alertDialog.open}
              title={props.alertDialog.title}
              text={props.alertDialog.text}
              handleClose={(bool) => props.alertDialog.handleClose(bool)}
            />
            <Switch>
              <ProtectedRoute exact path="/login" component={LoginContatiner} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <ProtectedRoute exact path="/loading" component={LoadingContatiner} />
              <ProtectedRoute exact path="/dummy" component={dummy} />
              <ProtectedRoute exact path="/" component={DashboardContatiner} />
              <ProtectedRoute exact path="/engagements/:tabname" component={EngagementsContatiner} />
              <ProtectedRoute exact path="/liveview" component={LiveViewContatiner} />
              <ProtectedRoute exact path="/analytics/:tabname" component={AnalyticsContatiner} />
              <ProtectedRoute exact path="/manage/:tabname" component={ManageContatiner} />
              <ProtectedRoute exact path="/segments" component={SegmentsContatiner} />
              <ProtectedRoute exact path="/admin" component={AdminContatiner} />
              <ProtectedRoute exact path="/settings" component={SettingsContatiner} />
              <ProtectedRoute exact path="/register" component={RegisterContatiner} />
              <ProtectedRoute exact path="/verify" component={VerifyContatiner} />
              <ProtectedRoute exact path="/poc" component={POCContainer} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Home>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
