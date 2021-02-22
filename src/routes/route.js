import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../components/common/notFound';
import { ThemeProvider } from '../contexts/themeContext';
import Home from '../components/home/home';
import DashboardContatiner from '../containers/dashboard/dashboardContainer';
import HeaderContainer from '../containers/header/headerContainer';

export default function AppRoute(props) {
  return (
    <ThemeProvider>
      <div id="app-route-container">
        <BrowserRouter>
          <HeaderContainer />
          <Home>
            <Switch>
              <Route exact path="/" component={DashboardContatiner}/>
              <Route path="*" component={NotFound} />
            </Switch>
          </Home>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
