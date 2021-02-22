import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import HeaderReducer from '../reducers/header/headerReducer';
import DashboardReducer from '../reducers/dashboard/dashboardReducer';

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
  DashboardReducer: DashboardReducer
});

// To persist your Store use sessionStorage after hard reoad
// const persistedStore = loadFromSessionStorage();
// const store = createStore(reducer, persistedStore, compose(applyMiddleware(thunk)));
// store.subscribe(() => saveToSessionStorage(store.getState()));

// Store without persist after hard reoad
const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
