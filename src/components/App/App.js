import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import extractRelevantDataFrom from '../../utils/extractRelevantDataFrom';
import { fakeResponse } from '../../utils/fakeResponse';
import './App.css';

import Now from '../Now/Now';
import Extreme from '../Extreme/Extreme';
import Precip from '../Precip/Precip';
import Wind from '../Wind/Wind';
import Tomorrow from '../Tomorrow/Tomorrow';
import * as action from '../../store/actions';


function App({ dispatch, condition, fetchStatus, error, precipTime }) {

  useEffect(() => {
    const { app, extreme, now, precip, tomorrow, wind } = extractRelevantDataFrom(fakeResponse);
    dispatch(action.updateApp(app));
    dispatch(action.updateExtreme(extreme));
    dispatch(action.updateNow(now));
    dispatch(action.updatePrecip(precip));
    dispatch(action.updateTomorrow(tomorrow));
    dispatch(action.updateWind(wind));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="App">
      <Now />
      <Extreme />
      <Precip />
      <Wind />
      <Tomorrow />
    </main>
  );
}

const mapState = state => ({ ...state.app, ...state.status, precipTime: state.precip.time });
export default connect(mapState)(App);
