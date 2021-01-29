import React from 'react';
import { connect } from 'react-redux';
import './Precip.css';

function Precip({ time, pops }) {
  return (
    <section className='Precip' aria-label='Precipitation'>
      
    </section>
  );
}

const mapState = ({ precip }) => precip;
export default connect(mapState)(Precip);
