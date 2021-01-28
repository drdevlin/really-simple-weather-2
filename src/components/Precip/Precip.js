import React from 'react';
import { connect } from 'react-redux';
import './Precip.css';

function Precip({ precip }) {
  return (
    <section className='Precip' aria-label='Precipitation'>
      
    </section>
  );
}

const mapState = state => state.precip;
export default connect(mapState)(Precip);
