import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as is from './actions';

const initialState = {
  app: {
    condition: 'nice'
  },
  extreme: {
    temp: 0,
    type: 'normal',
    time: Date.now()
  },
  now: {
    temp: 0,
    type: 'normal'
  },
  precip: {
    time: Date.now(),
    pops: []
  },
  tomorrow: {
    condition: 'nice',
    temp: 0
  },
  wind: {
    speeds: []
  },
  status: {
    fetchStatus: 'idle',
    error: null
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case is.updateAll().type:
      return { ...state, ...action.payload };
    case is.updateApp().type:
      return { ...state, app: action.app };
    case is.updateExtreme().type:
      return { ...state, extreme: action.extreme };
    case is.updateNow().type:
      return { ...state, now: action.now };
    case is.updatePrecip().type:
      return { ...state, precip: action.precip };
    case is.updateTomorrow().type:
      return { ...state, tomorrow: action.tomorrow };
    case is.updateWind().type:
      return { ...state, wind: action.wind };
    case is.updateStatus().type:
    case is.fetchLoading().type:
    case is.fetchSuccess().type:
    case is.fetchFailure({message:null}).type:
      return { ...state, status: { ...state.status, ...action.updates }};
    default:
      return state;
  }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
