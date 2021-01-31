import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Now from '../Now/Now';
import Extreme from '../Extreme/Extreme';
import Precip from '../Precip/Precip';
import Wind from '../Wind/Wind';
import Tomorrow from '../Tomorrow/Tomorrow';
import { fetchWeather } from '../../store/actions';


function App({ dispatch, condition, fetchStatus, error, precipTime }) {
  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchWeather());    
    }
  }, [dispatch, fetchStatus]);

  let mode;
  if (fetchStatus === 'failure') {
    mode = <p>{error}</p>;
  } else if (fetchStatus === 'loading') {
    mode = <p>Loading...</p>
  } else if (fetchStatus === 'success') {
    mode = (
      <section className='all'>
        <Now />
        <Extreme />
        {(precipTime) ? <Precip /> : <Wind />}
        <Tomorrow />
      </section>
    );
  }

  return (
    <main className={`App ${condition}`}>
      {mode}
    </main>
  );
}

const mapState = state => ({ ...state.app, ...state.status, precipTime: state.precip.time });
export default connect(mapState)(App);
