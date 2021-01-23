import { createStore } from 'redux';

const initialState = {
  app: {
    condition: 'nice'
  },
  now: {
    temp: 0,
    type: 'normal'
  },
  extreme: {
    temp: 0,
    type: 'normal',
    time: Date.now()
  },
  precip: {
    time: Date.now(),
    pops: []
  },
  wind: {
    speeds: []
  },
  tomorrow: {
    condition: 'nice',
    temp: 0
  },
  fetchStatus: 'idle',
  error: null
};

const reducer = (state, action) => {
  return state;
};

const store = createStore(reducer, initialState);

export default store;
