import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import HeaderReducer from '../reducers/header/headerReducer';
import DashboardReducer from '../reducers/dashboard/dashboardReducer';
import SettingsReducer from "../reducers/settings/settingsReducer";
import ProfileReducer from "../reducers/settings/profile/profileReducer";
import TeamReducer from "../reducers/settings/team/teamReducer";
import NotificationReducer from "../reducers/settings/notification/notificationReducer";
import AccessibilityReducer from "../reducers/settings/accessibility/accessibilityReducer";
import PropertySettingsReducer from "../reducers/settings/propertySettings/propertySettingsReducer";
import ManageReducer from "../reducers/manage/manageReducer";
import ManageRewardsReducer from "../reducers/manage/rewards/rewardsReducer";
import ManageGamePlayReducer from "../reducers/manage/gamePlay/gamePlayReducer";
import EngagementsReducer from "../reducers/engagements/engagementsReducer";
import EngagementsSmartReducer from "../reducers/engagements/smart/smartReducer";
import EngagementsJourneyReducer from "../reducers/engagements/journey/journeyReducer";
import LiveViewReducer from "../reducers/liveView/liveViewReducer";
import AnalyticsReducer from "../reducers/analytics/analyticsReducer";
import AnalyticsReportReducer from "../reducers/analytics/report/reportReducer";
import AnalyticsTrendsReducer from "../reducers/analytics/trends/trendsReducer";
import AnalyticsGamePerformanceReducer from "../reducers/analytics/gamePerformance/gamePerformanceReducer";
import SegmentsReducer from "../reducers/segments/segmentsReducer";
import AdminReducer from "../reducers/admin/adminReducer";
import POCReducer from '../reducers/poc/pocReducer';

function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('ssoState', serializedState);
  } catch(e) {
    console.log(e);
  }
}

function loadFromSessionStorage(state) {
  try {
    const serializedState = sessionStorage.getItem('ssoState');
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch(e) {
    console.log(e);
    return undefined;
  }
}

const reducer = combineReducers({
  HeaderReducer: HeaderReducer,
  DashboardReducer: DashboardReducer,
  SettingsReducer: SettingsReducer,
  ProfileReducer: ProfileReducer,
  TeamReducer: TeamReducer,
  NotificationReducer: NotificationReducer,
  AccessibilityReducer: AccessibilityReducer,
  PropertySettingsReducer: PropertySettingsReducer,
  ManageReducer: ManageReducer,
  ManageRewardsReducer: ManageRewardsReducer,
  ManageGamePlayReducer: ManageGamePlayReducer,
  EngagementsReducer: EngagementsReducer,
  EngagementsSmartReducer: EngagementsSmartReducer,
  EngagementsJourneyReducer: EngagementsJourneyReducer,
  LiveViewReducer: LiveViewReducer,
  AnalyticsReducer: AnalyticsReducer,
  AnalyticsReportReducer: AnalyticsReportReducer,
  AnalyticsTrendsReducer: AnalyticsTrendsReducer,
  AnalyticsGamePerformanceReducer: AnalyticsGamePerformanceReducer,
  SegmentsReducer: SegmentsReducer,
  AdminReducer: AdminReducer,
  POCReducer: POCReducer
});

// To persist your Store use sessionStorage after hard reoad
// const persistedStore = loadFromSessionStorage();
// const store = createStore(reducer, persistedStore, compose(applyMiddleware(thunk)));
// store.subscribe(() => saveToSessionStorage(store.getState()));

// Store without persist after hard reoad
const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
