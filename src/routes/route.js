import React from 'react';
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

export default function AppRoute(props) {
  let history = useHistory();
  console.log('window.location.href', window.location.href);
  return (
    <ThemeProvider>
      <div id="app-route-container">
        <BrowserRouter>
          {(window.location.href && !window.location.href.includes('/login') && !window.location.href.includes('/register') && !window.location.href.includes('/verify')) ? (
            <HeaderContainer />
          ) : null}
          <Home>
            <Switch>
              <Route exact path="/" component={DashboardContatiner}/>
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
