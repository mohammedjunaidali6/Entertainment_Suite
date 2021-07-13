import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
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
import store from '../store/store';


export default function AppRoute(props) {
  let history = useHistory();


  return (
    <ThemeProvider>
      <div id="app-route-container">
        <BrowserRouter>
          {(window.location.href && !window.location.href.includes('/login') && !window.location.href.includes('/register') && !window.location.href.includes('/verify')) ? (
            <HeaderContainer />
          ) : null}
          <Home>
            <Loader show={props.showLoader} />
            <AlertDialog
              open={props.alertDialog.open}
              title={props.alertDialog.title}
              text={props.alertDialog.text}
              handleClose={(bool) => props.alertDialog.handleClose(bool)}
            />
            <Switch>
              <Route exact path="/" component={DashboardContatiner} />
              <Route exact path="/engagements/:tabname" component={EngagementsContatiner} />
              <Route exact path="/liveview" component={LiveViewContatiner} />
              <Route exact path="/analytics/:tabname" component={AnalyticsContatiner} />
              <Route exact path="/manage/:tabname" component={ManageContatiner} />
              <Route exact path="/segments" component={SegmentsContatiner} />
              <Route exact path="/admin" component={AdminContatiner} />
              <Route exact path="/settings" component={SettingsContatiner} />
              <Route exact path="/login" component={LoginContatiner} />
              <Route exact path="/register" component={RegisterContatiner} />
              <Route exact path="/verify" component={VerifyContatiner} />
              <Route exact path="/poc" component={POCContainer} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Home>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
