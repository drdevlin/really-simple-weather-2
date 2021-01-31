import extractRelevantDataFrom from '../utils/extractRelevantDataFrom';
import { fakeResponse } from '../utils/fakeResponse';
import fetchResults from '../utils/fetchResults';

// Action creators
export const updateAll = all => {
  return { type: 'UPDATE_ALL', payload: { ...all }};
}
export const updateApp = app => {
  return { type: 'UPDATE_APP', app };
}
export const updateExtreme = extreme => {
  return { type: 'UPDATE_EXTREME', extreme };
}
export const updateNow = now => {
  return { type: 'UPDATE_NOW', now };
}
export const updatePrecip = precip => {
  return { type: 'UPDATE_PRECIP', precip };
}
export const updateTomorrow = tomorrow => {
  return { type: 'UPDATE_TOMORROW', tomorrow };
}
export const updateWind = wind => {
  return { type: 'UPDATE_WIND', wind };
}
export const updateStatus = updates => {
  return { type: 'UPDATE_STATUS', updates };
}
export const fetchLoading = () => {
  return { type: 'UPDATE_STATUS:LOADING', updates: { fetchStatus: 'loading' }};
}
export const fetchSuccess = () => {
  return { type: 'UPDATE_STATUS:SUCCESS', updates: { fetchStatus: 'success' }};
}
export const fetchFailure = error => {
  return { type: 'UPDATE_STATUS:FAILURE', updates: { fetchStatus: 'failure', error: error }};
}

// Thunks
export const fetchWeather = () => async (dispatch, getState) => {
  dispatch(fetchLoading());
  try {
    const response = await fetchResults('http://localhost:4444?url=https://dd.weather.gc.ca/citypage_weather/xml/ON/s0000785_e.xml');
    const payload = extractRelevantDataFrom(response);
    dispatch(updateAll(payload));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchFailure(err));
  }
}


