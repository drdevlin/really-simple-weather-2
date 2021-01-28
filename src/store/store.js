import { createStore } from 'redux';

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
  fetchStatus: 'idle',
  error: null
};

const reducer = (state, action) => {
  return state;
};

const store = createStore(reducer, initialState);

export default store;
